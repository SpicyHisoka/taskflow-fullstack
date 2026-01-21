package com.taskflow.controller;

import com.taskflow.model.Task;
import com.taskflow.repository.TaskRepository;
import com.taskflow.service.AiTaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks/ai")
@CrossOrigin(origins = {
	    "http://localhost:4200", // Angular
	    "http://10.0.2.2", // Emulatore android studio
	    "http://192.168.1.107" // IP terminale expo
	})public class AiTaskController {

    private final AiTaskService aiTaskService;
    private final TaskRepository taskRepository;

    public AiTaskController(AiTaskService aiTaskService, TaskRepository taskRepository) {
        this.aiTaskService = aiTaskService;
        this.taskRepository = taskRepository;
    }

    @PostMapping("/generate")
    public List<Task> generateTasks(@RequestBody String prompt) {
        List<Task> generatedTasks = aiTaskService.parsePrompt(prompt);
        
        // Reset manuale degli ID a null per sicurezza
        generatedTasks.forEach( task -> task.setId(null));
        
        return taskRepository.saveAll(generatedTasks);
    }
}