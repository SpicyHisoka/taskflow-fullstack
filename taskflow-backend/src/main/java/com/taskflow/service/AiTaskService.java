package com.taskflow.service;

import com.taskflow.model.Task;

import org.springframework.ai.chat.client.AdvisorParams;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import com.taskflow.repository.TaskRepository;

import java.util.List;

@Service
public class AiTaskService {

	private final ChatClient chatClient;
	private final TaskRepository taskRepository;

	public AiTaskService(ChatClient.Builder builder, TaskRepository taskRepository) {
		this.chatClient = builder.defaultSystem(
				  """
						You are a professional task extractor that can generate only JSON arrays.
						This is the object structure:
						[
				  		  {
				  		 	"id": (bigint always null)
				  		    "title": (varchar(255)),
				  			"description": (varchar(800)),
				  			"status": (varchar(255) always "TODO"),
				  			"priority": (enum('HIGH', 'LOW', 'MEDIUM')),
				  			"estimatedTimeMinutes": (int),
				  			"deadline": (datetime(6) format YYYY-MM-DDTHH:mm:ss or null)
				  		  },
				  		  { ... }
				  		]
						
						Extract all tasks from the user's prompt.
						If the user does not provide explicit data, assume it where possible; otherwise, leave it as null.
						Respond only with valid JSON.
						If you are about to finish your response, always complete strings, objects, and arrays in the JSON.
				  		Do not add text before or after the JSON, do not add reasoning.
						Always close all brackets, do not open brackets if it's not needed, close all quotation marks, and escape special characters.
						Max 5 tasks per call.
						Today is:
				  """ + java.time.LocalDateTime.now())
				.build();
		this.taskRepository = taskRepository;
	}
	
	public List<Task> generateTask(String userPrompt) {
	    try {
	    	List<Task> tasks = chatClient.prompt()
	    	        .advisors(AdvisorParams.ENABLE_NATIVE_STRUCTURED_OUTPUT)
	    	        .user(userPrompt)
	    	        .call()
	    	        .entity(new ParameterizedTypeReference<List<Task>>() {});

	        // Stampa il JSON raw generato dall'AI;
	        System.out.println("RAW AI RESPONSE:\n" + tasks.toString());

	        // Mappa direttamente in List<Task> senza warning
	        return tasks;
	    } catch (Exception e) {
	        System.err.println("Errore parsing AI: " + e.getMessage());
	        return List.of();
	    }
	}
	

	public List<Task> saveGeneratedTask(List<Task> tasks) {
	    // Importantissimo: resettiamo id a null per far capire a Hibernate che sono entità NUOVE
	    for (Task task : tasks) {
	        task.setId(null);           // ← chiave della soluzione
	        // Opzionale ma utile: se hai @Version
	        // task.setVersion(null);   // o 0 se è Long/Integer
	    }

	    return taskRepository.saveAll(tasks);
	}
}