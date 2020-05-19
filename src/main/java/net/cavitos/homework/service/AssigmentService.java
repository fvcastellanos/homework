package net.cavitos.homework.service;

import net.cavitos.homework.repository.AssigmentRepository;

public class AssigmentService {

    private final AssigmentRepository assigmentRepository;

    public AssigmentService(AssigmentRepository assigmentRepository) {

        this.assigmentRepository = assigmentRepository;
    }


}
