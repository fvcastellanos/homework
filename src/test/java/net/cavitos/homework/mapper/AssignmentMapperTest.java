package net.cavitos.homework.mapper;

import net.cavitos.homework.domain.model.Assignment;
import net.cavitos.homework.domain.view.AssignmentView;
import net.cavitos.homework.fixture.DomainFixture;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class AssignmentMapperTest {

    private AssignmentView assignmentView = DomainFixture.buildAssigmentView("test");
    private Assignment assignment = DomainFixture.buildAssigment("test");

    @Test
    public void testConvertToAssigment() {

        var value = AssigmentMapper.mapToAssigment(assignmentView);

        assertThat(value)
                .isEqualTo(this.assignment);
    }

    @Test
    public void testConvertToAssigmentView() {

        var value = AssigmentMapper.mapToAssigmentView(assignment);

        assertThat(value)
                .isEqualTo(assignmentView);
    }
}
