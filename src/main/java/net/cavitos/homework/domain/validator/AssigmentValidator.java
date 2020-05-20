package net.cavitos.homework.domain.validator;

import net.cavitos.homework.domain.model.Assigment;
import net.cavitos.homework.repository.AssigmentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import javax.validation.Validation;

public class AssigmentValidator extends BaseValidator {

    private static final Logger logger = LoggerFactory.getLogger(AssigmentValidator.class);

    private AssigmentRepository assigmentRepository;

    public AssigmentValidator(AssigmentRepository assigmentRepository) {

        this.assigmentRepository = assigmentRepository;
    }

    @Override
    public boolean supports(Class<?> aClass) {

        return Assigment.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {

        beanValidation(object, errors);
        validateExistingAssigmentName(object, errors);
    }

    private void validateExistingAssigmentName(Object object, Errors errors) {

        if (!errors.hasErrors()) {

            var assigment = (Assigment) object;
            var name = assigment.getName();
            var assigmentHolder = assigmentRepository.findByName(name);

            if (assigmentHolder.isPresent()) {

                logger.warn("assigment name: {} already exists", name);
                errors.rejectValue("name", "", "name already exists");
            }
        }
    }
}
