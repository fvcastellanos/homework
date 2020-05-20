create table if not exists attachment
(
	id int auto_increment,
	homework_id int not null,
	image_path text not null,
	constraint attachment_pk
		primary key (id)
);

create index attachment__fk_homework_id
	on attachment (homework_id);

