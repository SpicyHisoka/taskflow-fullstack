package com.taskflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.taskflow.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long>{

}
