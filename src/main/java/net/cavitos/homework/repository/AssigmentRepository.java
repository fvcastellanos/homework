package net.cavitos.homework.repository;

import net.cavitos.homework.domain.model.Assigment;
import org.springframework.data.repository.CrudRepository;

public interface AssigmentRepository extends CrudRepository<Assigment, Long> {
}
