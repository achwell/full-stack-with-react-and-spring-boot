package com.in28minutes.rest.webservices.restfulwebservices.todo;

import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import static java.time.LocalDate.now;

@Service
public class TodoHardcodedService {

    private static final Map<Long, Todo> todos = new HashMap<>();
    private static Long idCounter = 0L;

    static {
        Long id = ++idCounter;
        todos.put(id, new Todo(id, "in28minutes", "Learn Programming", now(), false));
        id = ++idCounter;
        todos.put(id, new Todo(id, "in28minutes", "Learn about Microservices 2", now(), false));
        id = ++idCounter;
        todos.put(id, new Todo(id, "in28minutes", "Learn about React", now(), false));
    }

    public Collection<Todo> findAll() {
        return todos.values();
    }

    public Todo save(Todo todo) {
        if (todo.getId() == -1 || todo.getId() == 0) {
            todo.setId(++idCounter);
        }
        todos.put(todo.getId(), todo);
        return todo;
    }

    public Todo deleteById(long id) {
        Todo todo = findById(id);
        return todo == null ? null : todos.remove(id);

    }

    public Todo findById(long id) {
        return todos.get(id);
    }
}