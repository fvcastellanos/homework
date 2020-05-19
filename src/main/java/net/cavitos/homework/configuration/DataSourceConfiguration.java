package net.cavitos.homework.configuration;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcOperations;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;

@Configuration
@EnableJdbcRepositories(basePackages = "net.cavitos.homework.repository")
public class DataSourceConfiguration {

    @Bean
    public DataSource dataSource(@Value("${homework.jdbc.url:jdbc:mysql://mysql-host:3306/homework}") String jdbcUrl,
                                 @Value("${homework.jdbc.user:root}") String jdbcUser,
                                 @Value("${homework.jdbc.password:r00t}") String jdbcPassword,
                                 @Value("${homework.jdbc.schema:homework}") String jdbcSchema) {

        var config = new HikariConfig();
        config.setJdbcUrl(jdbcUrl);
        config.setUsername(jdbcUser);
        config.setPassword(jdbcPassword);
        config.setSchema(jdbcSchema);

        return new HikariDataSource(config);
    }

    @Bean
    public NamedParameterJdbcOperations namedParameterJdbcOperations(DataSource dataSource) {

        return new NamedParameterJdbcTemplate(dataSource);
    }

    @Bean
    public PlatformTransactionManager transactionManager(DataSource dataSource) {

        return new DataSourceTransactionManager(dataSource);
    }

}