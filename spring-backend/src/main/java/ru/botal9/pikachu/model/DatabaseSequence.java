package ru.botal9.pikachu.model;

import org.springframework.data.annotation.Id;

public class DatabaseSequence {
    @Id
    private String id;

    private Long seq;

    public String getId() {
        return id;
    }

    public Long getSeq() {
        return seq;
    }
}
