package net.cavitos.homework.mapper;

import net.cavitos.homework.domain.model.Assigment;
import net.cavitos.homework.domain.view.AssigmentView;

public class AssigmentMapper {

    public static AssigmentView mapToAssigmentView(Assigment assigment) {

        return AssigmentView.builder()
                .id(assigment.getId())
                .name(assigment.getName())
                .description(assigment.getDescription())
                .email(assigment.getEmail())
                .copyEmail(assigment.getCopyEmail())
                .build();
    }

    public static Assigment mapToAssigment(AssigmentView assigmentView) {

        return Assigment.builder()
                .id(assigmentView.getId())
                .name(assigmentView.getName())
                .description(assigmentView.getDescription())
                .email(assigmentView.getEmail())
                .copyEmail(assigmentView.getCopyEmail())
                .build();
    }
}
