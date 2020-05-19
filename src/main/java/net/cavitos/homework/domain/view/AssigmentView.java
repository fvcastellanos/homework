package net.cavitos.homework.domain.view;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@ToString
@EqualsAndHashCode
public class AssigmentView {

    private long id;

    @Max(150)
    @NotBlank
    private String name;

    @Max(300)
    private String description;

    @Email
    @Max(250)
    @NotBlank
    private String email;

    @Email
    @Max(250)
    private String copyEmail;
}
