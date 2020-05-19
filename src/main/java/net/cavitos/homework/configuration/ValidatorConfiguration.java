package net.cavitos.homework.configuration;

import net.cavitos.homework.domain.validator.AssigmentValidator;
import net.cavitos.homework.domain.validator.HomeworkValidator;
import net.cavitos.homework.repository.AssigmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    public HomeworkValidator homeworkValidator() {

        return new HomeworkValidator();
    }

    @Configuration
    public static class ValidatorConfigurer implements RepositoryRestConfigurer {

        @Autowired
        private AssigmentValidator assigmentValidator;

        @Autowired
        private HomeworkValidator homeworkValidator;

        @Override
        public void configureValidatingRepositoryEventListener(ValidatingRepositoryEventListener validatingListener) {

            validatingListener.addValidator("beforeCreate", assigmentValidator);
            validatingListener.addValidator("beforeCreate", homeworkValidator);
        }
    }
}
