package net.cavitos.homework.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;

@Getter
@Builder
@ToString
@EqualsAndHashCode
@AllArgsConstructor
public class Assigment {

    @Id
    private long id;
    private String name;
    private String description;
    private String email;
    private String copyEmail;
}
