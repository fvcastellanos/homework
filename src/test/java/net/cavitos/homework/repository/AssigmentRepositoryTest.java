package net.cavitos.homework.repository;

import net.cavitos.homework.domain.model.Assigment;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class AssigmentRepositoryTest extends RepositoryTestBase {

    @Autowired
    private AssigmentRepository assigmentRepository;

    @Test
    public void testGetAssigments() {

        var assigment = buildAssigment("test assigment");

        var storedAssigment = saveAssigment(assigment);

        var assigments = assigmentRepository.findAll();

        assertThat(assigments)
                .containsOnlyOnce(storedAssigment);
    }

    @Test
    public void testSaveAssigment() {

        var assigmentName = "test assigment";

        var assigment = assigmentRepository.save(buildAssigment(assigmentName));

        var storedAssigment = getAssigment(assigmentName);

        assertThat(assigment)
                .isEqualTo(storedAssigment);
    }

    // ------------------------------------------------------------------------------------------------

    private Assigment getAssigment(String name) {

        return jdbcOperations.queryForObject("select * from assigment where name = ?", new Object[] { name }, ((rs, i) ->
            Assigment.builder()
                    .id(rs.getLong("id"))
                    .name(rs.getString("name"))
                    .description(rs.getString("description"))
                    .email(rs.getString("email"))
                    .copyEmail(rs.getString("copy_email"))
                    .build()
        ));
    }

    private List<Assigment> getAssigments() {

        return jdbcOperations.queryForList("select * from assigment", Assigment.class);
    }

    private Assigment saveAssigment(Assigment assigment) {

        jdbcOperations.update("insert into assigment (name, description, email, copy_email) values (?, ?, ?, ?)",
                assigment.getName(), assigment.getDescription(), assigment.getEmail(), assigment.getCopyEmail());

        return getAssigment(assigment.getName());
    }

    private static Assigment buildAssigment(String name) {

        return Assigment.builder()
                .name(name)
                .description("test assigment")
                .email("email@mail.com")
                .copyEmail("copyEmail@mail.com")
                .build();
    }
}
