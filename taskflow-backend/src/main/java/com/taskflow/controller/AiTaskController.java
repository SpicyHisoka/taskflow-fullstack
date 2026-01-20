package com.taskflow.controller;

import com.taskflow.model.Task;
import com.taskflow.repository.TaskRepository;
import com.taskflow.service.AiTaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks/ai")
@CrossOrigin(origins = {
	    "http://localhost:4200",    // Per Angular
	    "http://10.0.2.2",          // Per l'Emulatore Android Studio (fondamentale)
	    "http://192.168.1.107"      // Per l'IP che hai visto nel terminale Expo
	})public class AiTaskController {

    private final AiTaskService aiTaskService;
    private final TaskRepository taskRepository;

    public AiTaskController(AiTaskService aiTaskService, TaskRepository taskRepository) {
        this.aiTaskService = aiTaskService;
        this.taskRepository = taskRepository;
    }

    @PostMapping("/generate")
    public List<Task> generateTasks(@RequestBody String prompt) {
        // 1. L'IA interpreta il testo e crea gli oggetti Task
        List<Task> generatedTasks = aiTaskService.parsePrompt(prompt);
        
        // 2. RESETTO GLI ID A NULL PER FORZARE INSERIMENTO
        generatedTasks.forEach( task -> task.setId(null));
        
        // 3. Salviamo tutto nel database MySQL
        return taskRepository.saveAll(generatedTasks);
    }
}