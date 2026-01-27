package com.taskflow.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

//import java.util.List;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskflow.enums.TaskStatus;
import com.taskflow.model.Task;
import com.taskflow.repository.TaskRepository;

@Service
public class TaskService {

	private final TaskRepository repository;

	public TaskService(TaskRepository repository) {
		this.repository = repository;
	}

	public Page<Task> findTasks(Pageable pageable) {
		return repository.findAll(pageable);
	}


	public Task save(Task task) {
		return repository.save(task);
	}

	public void deleteTask(Long id) {
		if (!repository.existsById(id)) {
			throw new RuntimeException("Task non trovato con id: " + id);
		}

		repository.deleteById(id);
	}

	public Task getTask(Long id) {		
		return repository.findById(id)
				.orElseThrow(() -> new RuntimeException("Task non trovato con id " + id));
	}

	public Task patchTask(Long id, Task updatedTask) {
		Task existing = repository.findById(id)
				.orElseThrow(() -> new RuntimeException("Task non trovato con id " + id));

		if (updatedTask.getTitle() != null) existing.setTitle(updatedTask.getTitle());

		if (updatedTask.getDescription() != null) existing.setDescription(updatedTask.getDescription());

		if (updatedTask.getStatus() != null) existing.setStatus(updatedTask.getStatus());
		
		if (updatedTask.getDeadline() != null) existing.setDeadline(updatedTask.getDeadline());
		
		if (updatedTask.getEstimatedTimeMinutes() != null) {
			existing.setEstimatedTimeMinutes(updatedTask.getEstimatedTimeMinutes() > 0 
					? updatedTask.getEstimatedTimeMinutes()
					: 0);
		}
				
		if (updatedTask.getPriority() != null) existing.setPriority(updatedTask.getPriority());

		return repository.save(existing);
	}

	public Task patchStatus(Long id, String string) {
		Task task = repository.findById(id)
				.orElseThrow(() -> new RuntimeException("Task non trovato con id " + id));
		
		try {
			TaskStatus newStatus = TaskStatus.valueOf(string.toUpperCase());
			task.setStatus(newStatus);
		} catch (IllegalArgumentException e) {
	        throw new RuntimeException("Status non valido: " + string);
	    }

		return repository.save(task);
	}
}
