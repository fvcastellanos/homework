package net.cavitos.homework.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;

@Getter
@Builder
@ToString
@EqualsAndHashCode
@AllArgsConstructor
public class Homework {

    @Id
    private long id;

    @NotNull
    private long assigmentId;

    @NotBlank
    @Size(max = 150)
    private String name;

    @Size(max = 300)
    private String description;

    @NotNull
    private Instant due;
}
