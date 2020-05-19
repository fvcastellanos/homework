create schema if not exists homework;

create table assigment
(
	id int auto_increment,
	name varchar(150) null,
	description varchar(300) null,
	email varchar(300) not null,
	copy_email varchar(300) null,
	constraint assigment_pk
		primary key (id)
);

create unique index assigment_name_uindex
	on assigment (name);
