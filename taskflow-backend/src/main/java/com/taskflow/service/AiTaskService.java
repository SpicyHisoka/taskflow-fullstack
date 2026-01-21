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
		this.chatClient = builder
				.defaultSystem(
						"""
								Sei un estrattore di task automatico. Il tuo unico compito è restituire un array JSON valido.

								REGOLE ASSOLUTE - VIOLARE QUALSIASI REGOLA RENDEREBBE L'OUTPUT INUTILE:
								1. Output = SOLO array JSON. Niente testo prima, niente dopo, niente ```json, niente spiegazioni, niente thinking.
								2. Inizia esattamente con [ e termina esattamente con ]
								3. Ogni oggetto ha SOLO e soltanto queste 4 chiavi: "id", "title", "description", "status"
								4. "id" deve essere sempre null (scrivi "null" senza virgolette)
								5. "status" deve essere sempre "TODO" (stringa)
								6. "title" → max 100 caratteri, frase imperativa molto chiara e concisa
								7. "description" → max 700 caratteri. Includi: cosa fare esattamente + stima tempo (es. "2 ore") + eventuali scadenze/orari/luoghi/priorità se deducibili dal testo
								8. Usa solo virgolette doppie ", mai singole. Sfuggi i caratteri speciali se necessario (\n → \\n)
								9. Non troncare MAI l'array: se ci sono 7 task, scrivi tutti e 7
								10. Non inventare campi extra, non aggiungere commenti

								Esempio di output corretto (non modificarlo):
								[{"id":null,"title":"Prenotare visita oculista","description":"Chiamare studio Dr. Rossi entro venerdì, appuntamento preferibilmente martedì o mercoledì mattina, durata stimata 1 ora","status":"TODO"},{"id":null,"title":"Aggiornare CV","description":"Aggiungere esperienza 2025, rivedere sezione competenze, inviare a recruiter entro 20 gennaio, 3 ore totali","status":"TODO"}]

								Ora estrai i task dal testo dell'utente.
						""")
				.build();
	}

	public List<Task> parsePrompt(String userPrompt) {
		return chatClient.prompt().user(userPrompt).call().entity(new ParameterizedTypeReference<List<Task>>() {
		});
	}
}