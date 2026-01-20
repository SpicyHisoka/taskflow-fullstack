package com.taskflow.service;

import com.taskflow.model.Task;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AiTaskService {

	private final ChatClient chatClient;

	public AiTaskService(ChatClient.Builder builder) {
		// Configuriamo il client con un'istruzione di sistema (System Prompt)
		this.chatClient = builder.defaultSystem("""
				Sei un assistente AI specializzato nell'estrazione di attività (task).
				Analizza il testo dell'utente e crea una lista di task strutturati.

				Regole OBBLIGATORIE:
				- Restituisci SOLO un array JSON valido, NIENTE altro testo prima/dopo.
				- Ogni task ha esattamente questi campi: "id", "title", "description", "status".
				- "id" è sempre "null"
				- "status" è sempre "TODO"
				- "title" chiaro ed emblematico
				- "description" max 800 caratteri (descrizione della task da fare e tempo di esecuzione stimato, orari, scadenze, ecc).
				- Chiudi sempre tutte le virgolette e parentesi quadre.
				- Non interrompere a metà la risposta: completa l'array anche se è lungo.

				Esempio corretto:
				[
					{"id": "null","title":"Chiamare dentista","description":"Appuntamento ore 11","status":"TODO"},
					{"id": "null","title":"Chiamare commercialista","description":"Appuntamento ore 13 dettagli casa","status":"TODO"}
				]

				Inizia direttamente con [ e termina con ]
				""").build();
	}

	public List<Task> parsePrompt(String userPrompt) {
		return chatClient.prompt().user(userPrompt).call().entity(new ParameterizedTypeReference<List<Task>>() {
		});
	}
}