create table users
(
	id numeric not null,
	name varchar(30) not null ,
	surname varchar(30) not null,
	dateOfBirth date null,
	passwordMd5 varchar(50) not null,
    isDeleted boolean not null
);

