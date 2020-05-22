package net.cavitos.homework.service;

import io.vavr.control.Either;
import io.vavr.control.Try;
import net.cavitos.homework.domain.view.AssignmentView;
import net.cavitos.homework.mapper.AssigmentMapper;
import net.cavitos.homework.repository.AssigmentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static net.cavitos.homework.mapper.AssigmentMapper.mapToAssigment;
import static net.cavitos.homework.mapper.AssigmentMapper.mapToAssigmentView;

public class AssigmentService {

    private static final Logger logger = LoggerFactory.getLogger(AssigmentService.class);

    private final AssigmentRepository assigmentRepository;

    public AssigmentService(AssigmentRepository assigmentRepository) {

        this.assigmentRepository = assigmentRepository;
    }

    public Either<String, AssignmentView> saveAssigment(AssignmentView assignmentView) {

        try {

            logger.info("creating assigment with name: {}", assignmentView.getName());
            var assigmentHolder = assigmentRepository.findByName(assignmentView.getName());

            if (assigmentHolder.isPresent()) {

                var response = String.format("assigment with name: %s already exists", assignmentView.getName());

                logger.info(response);
                return Either.left(response);
            }

            var assigment = mapToAssigment(assignmentView);
            var stored = assigmentRepository.save(assigment);

            logger.info("assigment with name: {}", assignmentView.getName());
            return Either.right(mapToAssigmentView(stored));

        } catch (Exception ex) {
            logger.error("can't add new assigment: ", ex);
            return Either.left("can't add new assigment with name: " + assignmentView.getName());
        }
    }

    public Either<String, List<AssignmentView>> getAssigmentList() {

        return Try.of(() -> {
            logger.info("getting assigment list");

            return StreamSupport.stream(assigmentRepository.findAll()
                    .spliterator(), false)
                    .map(AssigmentMapper::mapToAssigmentView)
                    .collect(Collectors.toList()); })
                .onFailure(ex -> logger.error("can't get assigment list: ", ex))
                .toEither()
                .mapLeft(ex -> "can't retrieve assigment list");
    }

    public Either<String, AssignmentView> getAssigment(long id) {

        try {

            var assigmentHolder = assigmentRepository.findById(id);

            if (assigmentHolder.isPresent()) {

                var output = String.format("assigment with id: %s not found", id);
                return Either.left(output);
            }

            var view = assigmentHolder.map(AssigmentMapper::mapToAssigmentView)
                    .get();

            return Either.right(view);

        } catch (Exception ex) {

            logger.error("can't get assigment with id: {} - ", id, ex);
            return Either.left("can't get assigment with id: " + id);
        }
    }
}
