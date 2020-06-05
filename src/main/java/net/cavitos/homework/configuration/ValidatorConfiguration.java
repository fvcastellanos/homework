package net.cavitos.homework.configuration;

import net.cavitos.homework.domain.validator.AssigmentValidator;
import net.cavitos.homework.domain.validator.AttachmentValidator;
import net.cavitos.homework.domain.validator.HomeworkValidator;
import net.cavitos.homework.repository.AssigmentRepository;
import net.cavitos.homework.repository.HomeworkRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

@Configuration
@Import(ValidatorConfiguration.ValidatorConfigurer.class)
public class ValidatorConfiguration implements RepositoryRestConfigurer {

    @Bean
    public AssigmentValidator assigmentValidator(AssigmentRepository assigmentRepository) {

        return new AssigmentValidator(assigmentRepository);
    }

    @Bean
    public HomeworkValidator homeworkValidator(AssigmentRepository assigmentRepository,
                                               HomeworkRepository homeworkRepository) {

        return new HomeworkValidator(homeworkRepository, assigmentRepository);
    }

    @Bean
    public AttachmentValidator attachmentValidator(HomeworkRepository homeworkRepository) {

        return new AttachmentValidator(homeworkRepository);
    }

    @Configuration
    public static class ValidatorConfigurer implements RepositoryRestConfigurer {

        private final AssigmentValidator assigmentValidator;
        private final HomeworkValidator homeworkValidator;
        private final AttachmentValidator attachmentValidator;

        public ValidatorConfigurer(AssigmentValidator assigmentValidator,
                                   HomeworkValidator homeworkValidator,
                                   AttachmentValidator attachmentValidator) {

            this.assigmentValidator = assigmentValidator;
            this.homeworkValidator = homeworkValidator;
            this.attachmentValidator = attachmentValidator;
        }

        @Override
        public void configureValidatingRepositoryEventListener(ValidatingRepositoryEventListener validatingListener) {

            validatingListener.addValidator("beforeCreate", assigmentValidator);
            validatingListener.addValidator("beforeCreate", homeworkValidator);
            validatingListener.addValidator("beforeCreate", attachmentValidator);
        }
    }
}
