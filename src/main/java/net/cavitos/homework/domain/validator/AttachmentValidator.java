package net.cavitos.homework.domain.validator;

import net.cavitos.homework.domain.model.Attachment;
import net.cavitos.homework.repository.HomeworkRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.Errors;

public class AttachmentValidator extends BaseValidator {

    private static final Logger logger = LoggerFactory.getLogger(AttachmentValidator.class);

    private HomeworkRepository homeworkRepository;

    public AttachmentValidator(HomeworkRepository homeworkRepository) {

        this.homeworkRepository = homeworkRepository;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return Attachment.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {

        beanValidation(object, errors);
        validateNonExistingHomeworkId(object, errors);
    }

    // ------------------------------------------------------------------------------------------------

    private void validateNonExistingHomeworkId(Object object, Errors errors) {

        if (!errors.hasErrors()) {

            var attachment = (Attachment) object;
            var homeworkId = attachment.getHomeworkId();

            var homeworkHolder = homeworkRepository.findById(homeworkId);

            if (homeworkHolder.isEmpty()) {

                logger.warn("homework id: {} doesn't exists", homeworkId);
                errors.rejectValue("homeworkId", "", "doesn't exist");
            }
        }
    }
}
