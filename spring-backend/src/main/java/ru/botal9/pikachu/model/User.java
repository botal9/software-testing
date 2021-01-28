package ru.botal9.pikachu.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Transient
    public static final String SEQUENCE_NAME = "users_sequence";

    @Id
    private Long id = 0L;

    public String login;
    public String email;
    public String name;
    public String password;

    public User() {}

    public User(String login, String email, String name, String password) {
        this.login = login;
        this.email = email;
        this.name = name;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
