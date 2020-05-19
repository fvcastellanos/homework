package net.cavitos.homework.mapper;

import net.cavitos.homework.domain.model.Assigment;
import net.cavitos.homework.domain.view.AssigmentView;
import net.cavitos.homework.fixture.DomainFixture;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class AssigmentMapperTest {

    private AssigmentView assigmentView = DomainFixture.buildAssigmentView("test");
    private Assigment assigment = DomainFixture.buildAssigment("test");

    @Test
    public void testConvertToAssigment() {

        var value = AssigmentMapper.mapToAssigment(assigmentView);

        assertThat(value)
                .isEqualTo(this.assigment);
    }

    @Test
    public void testConvertToAssigmentView() {

        var value = AssigmentMapper.mapToAssigmentView(assigment);

        assertThat(value)
                .isEqualTo(assigmentView);
    }
}
