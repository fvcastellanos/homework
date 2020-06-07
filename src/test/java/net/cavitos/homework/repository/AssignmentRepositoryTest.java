package net.cavitos.homework.repository;

import net.cavitos.homework.domain.model.Assignment;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

public class AssignmentRepositoryTest extends RepositoryTestBase {

    @Autowired
    private AssigmentRepository assigmentRepository;

    @Test
    public void testGetAssignments() {

        var assigment = buildAssigment("test assignment");
        var storedAssigment = saveAssigment(assigment);

        var assignments = assigmentRepository.findAll();

        assertThat(assignments)
                .containsOnlyOnce(storedAssigment);
    }

    @Test
    public void testSaveAssigment() {

        var assigmentName = "test assignment";
        var assigment = assigmentRepository.save(buildAssigment(assigmentName));

        var storedAssigment = getAssigment(assigmentName);

        assertThat(assigment)
                .isEqualTo(storedAssigment);
    }

    @Test
    public void testFindByName() {

        var assigmentName = "test assignment";
        var assigment = saveAssigment(buildAssigment(assigmentName));

        var storedAssigment = assigmentRepository.findByName(assigmentName);

        assertThat(storedAssigment)
                .isPresent().get()
                .isEqualTo(assigment);
    }

    // ------------------------------------------------------------------------------------------------

    private Assignment getAssigment(String name) {

        return jdbcOperations.queryForObject("select * from assignment where name = ?", new Object[] { name }, ((rs, i) ->
            Assignment.builder()
                    .id(rs.getLong("id"))
                    .name(rs.getString("name"))
                    .description(rs.getString("description"))
                    .email(rs.getString("email"))
                    .copyEmail(rs.getString("copy_email"))
                    .build()
        ));
    }

    private Assignment saveAssigment(Assignment assignment) {

        jdbcOperations.update("insert into assignment (name, description, email, copy_email) values (?, ?, ?, ?)",
                assignment.getName(), assignment.getDescription(), assignment.getEmail(), assignment.getCopyEmail());

        return getAssigment(assignment.getName());
    }

    private static Assignment buildAssigment(String name) {

        return Assignment.builder()
                .name(name)
                .description("test assignment")
                .email("email@mail.com")
                .copyEmail("copyEmail@mail.com")
                .build();
    }
}
