package net.cavitos.homework.fixture;

import net.cavitos.homework.domain.model.Assignment;
import net.cavitos.homework.domain.view.AssignmentView;

public class DomainFixture {

    public static Assignment buildAssigment(String name) {

        return Assignment.builder()
                .name(name)
                .description("description")
                .email("email@mail.com")
                .copyEmail("copyEmail.mail.com")
                .build();
    }

    public static AssignmentView buildAssigmentView(String name) {

        return AssignmentView.builder()
                .name(name)
                .description("description")
                .email("email@mail.com")
                .copyEmail("copyEmail.mail.com")
                .build();
    }
}
