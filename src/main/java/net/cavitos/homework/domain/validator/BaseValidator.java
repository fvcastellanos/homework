package net.cavitos.homework.domain.validator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import javax.validation.Validation;

public abstract class BaseValidator implements Validator {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    protected void beanValidation(Object object, Errors errors) {
        var validatorFactory = Validation.buildDefaultValidatorFactory();
        var validator = validatorFactory.getValidator();

        var violations = validator.validate(object);

        violations.forEach(violation -> {
            logger.info("validation error: {} {}", violation.getPropertyPath(), violation.getMessage());
            errors.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
        });
    }
}
