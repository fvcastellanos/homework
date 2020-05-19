package net.cavitos.homework.domain.validator;

import net.cavitos.homework.domain.model.Homework;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import javax.validation.Validation;

public class HomeworkValidator implements Validator {

    private static final Logger logger = LoggerFactory.getLogger(HomeworkValidator.class);

    @Override
    public boolean supports(Class<?> aClass) {
        return Homework.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {

        var validatorFactory = Validation.buildDefaultValidatorFactory();
        var validator = validatorFactory.getValidator();

        var violations = validator.validate(object);

        violations.forEach(violation -> {

            logger.info("validation error: {} {}", violation.getPropertyPath(), violation.getMessage());

            errors.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
        });
    }
}
