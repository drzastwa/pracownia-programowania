-- auto-generated definition
create table users
(
    id          tinytext   not null,
    name        tinytext   not null,
    surname     tinytext   not null,
    login       tinytext   not null,
    dateOfBirth date       null,
    passwordMd5 tinytext   not null,
    isDeleted   tinyint(1) not null
);

