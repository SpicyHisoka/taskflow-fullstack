package com.taskflow.controller;

import java.util.Map;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import com.taskflow.model.Task;
import com.taskflow.service.TaskService;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = {
	    "http://localhost:4200",
	    "http://10.0.2.2",
	    "http://192.168.1.107"
	})
public class TaskController {

	private final TaskService service;

	public TaskController(TaskService service) {
		this.service = service;
	}

	@GetMapping
	public Page<Task> getTasks(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "20") int size) {
		Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
		return service.findTasks(pageable);
	}

	@GetMapping("/{id}")
	public Task getTask(@PathVariable Long id) {
		return service.getTask(id);
	}

	@PostMapping
	public Task create(@RequestBody Task task) {
		return service.save(task);
	}

	@DeleteMapping("/{id}")
	public void deleteTask(@PathVariable Long id) {
		service.deleteTask(id);
	}

	@PatchMapping("/{id}")
	public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
		return service.patchTask(id, updatedTask);
	}

	@PatchMapping("/{id}/status")
	public Task updateTaskStatus(
			@PathVariable Long id,
			@RequestBody Map<String, String> body) {
		return service.patchStatus(id, body.get("status"));
	}
}
