package com.taskflow.controller;

import com.taskflow.model.Task;
import com.taskflow.service.AiTaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks/ai")
@CrossOrigin(origins = {
	    "http://localhost:4200", // Angular
	    "http://10.0.2.2", // Emulatore android studio
	    "http://192.168.1.107" // IP terminale expo
	})
public class AiTaskController {

    private final AiTaskService aiTaskService;

    public AiTaskController(AiTaskService aiTaskService) {
        this.aiTaskService = aiTaskService;
    }

    @PostMapping("/generate")
    public List<Task> generateTasks(@RequestBody String prompt) {
    	List<Task> task =  aiTaskService.generateTask(prompt);
    	
    	return aiTaskService.saveGeneratedTask(task);
    }
}