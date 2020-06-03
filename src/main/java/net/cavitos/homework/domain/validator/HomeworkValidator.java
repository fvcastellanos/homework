package net.cavitos.homework.domain.validator;

import net.cavitos.homework.domain.model.Homework;
import net.cavitos.homework.repository.AssigmentRepository;
import net.cavitos.homework.repository.HomeworkRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.Errors;

public class HomeworkValidator extends BaseValidator {

    private static final Logger logger = LoggerFactory.getLogger(HomeworkValidator.class);

    private AssigmentRepository assigmentRepository;
    private HomeworkRepository homeworkRepository;

    public HomeworkValidator(HomeworkRepository homeworkRepository,
                             AssigmentRepository assigmentRepository) {

        this.assigmentRepository = assigmentRepository;
        this.homeworkRepository = homeworkRepository;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return Homework.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {

        beanValidation(object, errors);
        validateExistingName(object, errors);
        validateNonExistingAssigmentId(object, errors);
    }

    private void validateExistingName(Object object, Errors errors) {

        if (!errors.hasErrors()) {

            var homework = (Homework) object;
            var name = homework.getName();
            var homeworkHolder = homeworkRepository.findByName(name);

            if (homeworkHolder.isPresent()) {

                logger.warn("homework name: {} already exists", name);
                errors.rejectValue("assigmentId", "", "name already exists");
            }
        }
    }

    // --------------------------------------------------------------------------------

    private void validateNonExistingAssigmentId(Object object, Errors errors) {

        if (!errors.hasErrors()) {

            var homework = (Homework) object;
            var assigmentId = homework.getAssignmentId();

            var assigmentHolder = assigmentRepository.findById(assigmentId);

            if (assigmentHolder.isEmpty()) {

                logger.warn("assigment id: {} doesn't exists", assigmentId);
                errors.rejectValue("assigmentId", "", "doesn't exists");
            }
        }
    }
}
