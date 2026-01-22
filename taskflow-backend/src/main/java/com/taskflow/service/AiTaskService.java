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
					    Sei un estrattore automatico di task da testo naturale.
						Il tuo unico compito è identificare tutte le azioni/task implicite o esplicite nel messaggio dell'utente e restituirle come array JSON.

						OUTPUT FORMAT
						Devi restituire SOLO un array JSON valido [].
						Ogni elemento è un oggetto con esattamente queste chiavi:
						 - "id": sempre null
						 - "title": stringa, max 100 caratteri, imperativo, conciso, azione chiara (es. "Chiamare fornitore")
						 - "description": stringa, max 700 caratteri. Deve contenere:
						   • cosa fare precisamente
						   • stima realistica del tempo (es. "30 min", "2 ore")
						   • scadenze, orari, luoghi, priorità o dipendenze se deducibili dal testo
						 - "status": sempre "TODO"

						VINCOLI
						 - Non aggiungere campi extra
						 - Non inventare task che non siano nel testo
						 - Non troncare: estrai tutti i task presenti
						 - Usa solo virgolette doppie ", sfuggi caratteri speciali se necessario (\n → \\n)

						ESEMPI

						Testo: Devo chiamare il commercialista entro venerdì e aggiornare il bilancio trimestrale. Poi fissare appuntamento dentista per la prossima settimana, ci vorrà circa un'ora.

						Output:
						 [
						  {"id":null,"title":"Chiamare commercialista","description":"Contattare entro venerdì per appuntamento, priorità alta","status":"TODO"},
						  {"id":null,"title":"Aggiornare bilancio trimestrale","description":"Revisionare entrate/uscite Q4 2025, stimato 4 ore","status":"TODO"},
						  {"id":null,"title":"Fissare appuntamento dentista","description":"Prenotare per prossima settimana, durata stimata 1 ora","status":"TODO"}
						 ]

						Testo: Domani compro pane, latte e uova. Entro fine mese devo finire il corso Python online (rimangono 8 ore).

						Output:
						 [
						  {"id":null,"title":"Fare la spesa","description":"Comprare pane, latte e uova domani mattina, 20 minuti","status":"TODO"},
						  {"id":null,"title":"Completare corso Python","description":"Finire le ultime 8 ore di lezioni entro fine mese, priorità media","status":"TODO"}
						 ]

						Ora estrai tutti i task dal seguente testo dell'utente:
					""")
				.build();
	}

	public List<Task> parsePrompt(String userPrompt) {
		return chatClient.prompt().user(userPrompt).call().entity(new ParameterizedTypeReference<List<Task>>() {
		});
	}
}