package net.cavitos.homework.repository;

import net.cavitos.homework.domain.model.Assigment;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AssigmentRepository extends CrudRepository<Assigment, Long> {

    Optional<Assigment> findByName(String name);
}
