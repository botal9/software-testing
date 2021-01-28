package ru.botal9.pikachu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Service;
import ru.botal9.pikachu.model.Post;

@Service
public class PostModelListener extends AbstractMongoEventListener<Post> {
    @Autowired private SequenceGeneratorService sequenceGenerator;

    @Override
    public void onBeforeConvert(BeforeConvertEvent<Post> event) {
        if (event.getSource().getId() < 1) {
            event.getSource().setId(sequenceGenerator.generateSequence(Post.SEQUENCE_NAME));
        }
    }
}
