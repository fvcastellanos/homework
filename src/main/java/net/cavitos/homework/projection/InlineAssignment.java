package net.cavitos.homework.projection;

import net.cavitos.homework.domain.model.Assignment;
import net.cavitos.homework.domain.model.Homework;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.time.Instant;

@Projection(name = "inlineAssignment", types = { Homework.class })
public interface InlineAssignment {

    @Value("#{target.id}")
    long getPk();

    String getName();
    String getDescription();
    Instant getDue();
    Assignment getAssignment();
}
