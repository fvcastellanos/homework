create table if not exists homework
(
	id int auto_increment,
	name varchar(150) not null,
	description varchar(300) null,
	assigment_id int not null,
	due timestamp default CURRENT_TIMESTAMP not null,
	constraint homework_pk
		primary key (id)
);

create index homework__fk_assigment_id
	on homework (assigment_id);

create unique index homework_name_uindex
	on homework (name);

