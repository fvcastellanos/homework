package net.cavitos.homework.mapper;

import net.cavitos.homework.domain.model.Assignment;
import net.cavitos.homework.domain.view.AssignmentView;

public class AssigmentMapper {

    public static AssignmentView mapToAssigmentView(Assignment assignment) {

        return AssignmentView.builder()
                .id(assignment.getId())
                .name(assignment.getName())
                .description(assignment.getDescription())
                .email(assignment.getEmail())
                .copyEmail(assignment.getCopyEmail())
                .build();
    }

    public static Assignment mapToAssigment(AssignmentView assignmentView) {

        return Assignment.builder()
                .id(assignmentView.getId())
                .name(assignmentView.getName())
                .description(assignmentView.getDescription())
                .email(assignmentView.getEmail())
                .copyEmail(assignmentView.getCopyEmail())
                .build();
    }
}
