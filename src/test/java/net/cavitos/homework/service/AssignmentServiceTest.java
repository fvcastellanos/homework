package net.cavitos.homework.service;

import net.cavitos.homework.fixture.DomainFixture;
import net.cavitos.homework.repository.AssigmentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
public class AssignmentServiceTest {

    @Mock
    private AssigmentRepository assigmentRepository;

    private AssigmentService assigmentService;

    @BeforeEach
    void setup() {

        assigmentService = new AssigmentService(assigmentRepository);
    }

    @Test
    void testAddAssigment() {
        var view = DomainFixture.buildAssigmentView("test");
        var assigment = DomainFixture.buildAssigment("test");

//        when(assigmentRepository.save(any(Assigment.class)))
//                .thenReturn(view);


        var result = assigmentService.saveAssigment(view);
    }


}
