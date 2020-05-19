package net.cavitos.homework.fixture;

import net.cavitos.homework.domain.model.Assigment;
import net.cavitos.homework.domain.view.AssigmentView;

public class DomainFixture {

    public static Assigment buildAssigment(String name) {

        return Assigment.builder()
                .name(name)
                .description("description")
                .email("email@mail.com")
                .copyEmail("copyEmail.mail.com")
                .build();
    }

    public static AssigmentView buildAssigmentView(String name) {

        return AssigmentView.builder()
                .name(name)
                .description("description")
                .email("email@mail.com")
                .copyEmail("copyEmail.mail.com")
                .build();
    }
}
