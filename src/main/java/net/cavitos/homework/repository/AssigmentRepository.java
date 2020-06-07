package net.cavitos.homework.repository;

import net.cavitos.homework.domain.model.Assignment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource(path = "assignments")
public interface AssigmentRepository extends PagingAndSortingRepository<Assignment, Long> {

    Optional<Assignment> findByName(String name);
}
