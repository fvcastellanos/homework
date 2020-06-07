package net.cavitos.homework.domain.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;

@Getter
@Setter
public abstract class BaseEntity {

    @Column(name = "id", insertable = false, updatable = false)
    protected long pk;
}
