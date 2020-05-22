create schema if not exists homework;

create table if not exists assignment
(
	id int auto_increment,
	name varchar(150) not null,
	description varchar(300) null,
	email varchar(300) not null,
	copy_email varchar(300) null,
	constraint assigment_pk
		primary key (id)
);

create unique index assignment_name_uindex
	on assignment (name);
