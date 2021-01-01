package com.in28minutes.rest.webservices.restfulwebservices.todo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Collection;
import java.util.Objects;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TodoJpaController {

    private final TodoJpaRepository todoJpaRepository;

    public TodoJpaController(TodoJpaRepository todoJpaRepository) {
        this.todoJpaRepository = todoJpaRepository;
    }

    @GetMapping("/jpa/users/{username}/todos")
    public Collection<Todo> getAllTodos(@PathVariable String username) {
        return todoJpaRepository.findByUsername(username);
    }

    @GetMapping("/jpa/users/{username}/todos/{id}")
    public Todo getTodo(@PathVariable String username, @PathVariable long id) {
        return todoJpaRepository.findByUsername(username).stream()
                .filter(todo -> Objects.equals(todo.getId(), id))
                .findFirst().orElse(null);
    }

    @DeleteMapping("/jpa/users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable long id) {
        Todo todo = todoJpaRepository.findByUsername(username).stream()
                .filter(t -> Objects.equals(t.getId(), id))
                .findFirst().orElse(null);
        if (todo != null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/jpa/users/{username}/todos/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable String username, @PathVariable long id, @RequestBody Todo todo) {
        todo.setUsername(username);
        Todo todoUpdated = todoJpaRepository.save(todo);
        return new ResponseEntity<>(todoUpdated, HttpStatus.OK);
    }

    @PostMapping("/jpa/users/{username}/todos")
    public ResponseEntity<Void> createTodo(@PathVariable String username, @RequestBody Todo todo) {
        todo.setUsername(username);
        Todo createdTodo = todoJpaRepository.save(todo);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdTodo.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
}
