package net.cavitos.homework.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Builder
@ToString
@EqualsAndHashCode
@AllArgsConstructor
public class Assignment {

    @Id
    private long id;

    @NotBlank
    @Size(max = 150)
    private String name;

    @Size(max = 300)
    private String description;

    @Email
    @NotBlank
    @Size(max = 250)
    private String email;

    @Email
    @Size(max = 250)
    private String copyEmail;
}
