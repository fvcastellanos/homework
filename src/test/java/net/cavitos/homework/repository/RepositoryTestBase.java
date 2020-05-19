package net.cavitos.homework.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootTest
public abstract class RepositoryTestBase {

    @Autowired
    protected JdbcOperations jdbcOperations;
}
