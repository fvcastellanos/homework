package net.cavitos.homework.repository;

import net.cavitos.homework.domain.model.Attachment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(path = "attachments")
public interface AttachmentRepository extends CrudRepository<Attachment, Long> {

    List<Attachment> findByHomeworkId(long attachmentId);
}
