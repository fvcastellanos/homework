package net.cavitos.homework.repository;

import net.cavitos.homework.domain.model.Homework;
import net.cavitos.homework.projection.InlineAssignment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource(path = "tasks", excerptProjection = InlineAssignment.class)
public interface HomeworkRepository extends CrudRepository<Homework, Long> {

    Optional<Homework> findByName(String name);
}
