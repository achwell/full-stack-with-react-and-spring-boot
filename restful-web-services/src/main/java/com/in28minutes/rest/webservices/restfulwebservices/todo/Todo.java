package com.in28minutes.rest.webservices.restfulwebservices.todo;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;
import java.util.Objects;
import java.util.StringJoiner;

@Entity
public class Todo {

    @Id
    @GeneratedValue
    private Long id;

    private String username;

    private String description;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate targetDate;

    private boolean isDone;

    public Todo() {

    }

    public Todo(Long id, String username, String description, LocalDate targetDate, boolean isDone) {
        super();
        this.id = id;
        this.username = username;
        this.description = description;
        this.targetDate = targetDate;
        this.isDone = isDone;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getTargetDate() {
        return targetDate;
    }

    public void setTargetDate(LocalDate targetDate) {
        this.targetDate = targetDate;
    }

    public boolean isDone() {
        return isDone;
    }

    public void setDone(boolean isDone) {
        this.isDone = isDone;
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", Todo.class.getSimpleName() + "[", "]")
                .add("id=" + id)
                .add("username='" + username + "'")
                .add("description='" + description + "'")
                .add("targetDate=" + targetDate)
                .add("isDone=" + isDone)
                .toString();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Todo todo = (Todo) o;
        return isDone == todo.isDone && id.equals(todo.id) && username.equals(todo.username) && description.equals(todo.description) && targetDate.equals(todo.targetDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, description, targetDate, isDone);
    }
}
