package net.cavitos.homework.repository;

import net.cavitos.homework.domain.model.Assigment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource(path = "assigments")
public interface AssigmentRepository extends CrudRepository<Assigment, Long> {

    Optional<Assigment> findByName(String name);
}
