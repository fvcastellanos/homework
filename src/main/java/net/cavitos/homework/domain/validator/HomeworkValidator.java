package net.cavitos.homework.domain.validator;

import net.cavitos.homework.domain.model.Homework;
import net.cavitos.homework.repository.HomeworkRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.Errors;

import java.util.Objects;

public class HomeworkValidator extends BaseValidator {

    private static final Logger logger = LoggerFactory.getLogger(HomeworkValidator.class);

    private HomeworkRepository homeworkRepository;

    public HomeworkValidator(HomeworkRepository homeworkRepository) {

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
        validateNonExistingAssigment(object, errors);
    }

    private void validateExistingName(Object object, Errors errors) {

        if (!errors.hasErrors()) {

            var homework = (Homework) object;
            var name = homework.getName();
            var homeworkHolder = homeworkRepository.findByName(name);

            if (homeworkHolder.isPresent()) {

                logger.warn("homework name: {} already exists", name);
                errors.rejectValue("name", "", "name already exists");
            }
        }
    }

    // --------------------------------------------------------------------------------

    private void validateNonExistingAssigment(Object object, Errors errors) {

        if (!errors.hasErrors()) {

            var homework = (Homework) object;

            if (Objects.isNull(homework.getAssignment())) {

                logger.warn("assigment doesn't exists");
                errors.rejectValue("assignment", "", "doesn't exists");
            }
        }
    }
}
