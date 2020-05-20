package net.cavitos.homework.repository;

import net.cavitos.homework.domain.model.Homework;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource(path = "homeworks")
public interface HomeworkRepository extends CrudRepository<Homework, Long> {

    Optional<Homework> findByName(String name);
}
