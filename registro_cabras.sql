create database goats;
use goats;
create table cabras(id bigint auto_increment primary key,
    nombre varchar(50),
    fecha_nacimiento varchar(20),
    fecha_fallecimiento varchar(20),
    estado varchar(20));
    
select * from cabras;