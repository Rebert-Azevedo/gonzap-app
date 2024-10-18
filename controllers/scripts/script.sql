/*Script criação da tabela audios*/
create table audios (
id int auto_increment primary key, 
nome varchar(255), 
audio blob
);

/*Script criação da tabela documentos*/
create table documentos (
id int auto_increment primary key, 
nome varchar(255), 
documento blob
);

/*Script criação da tabela mensagens*/
create table mensagens (
id int auto_increment primary key, 
nome varchar(255), 
mensagem text
);

/*Script criação da tabela usuarios*/
create table usuarios (
id int auto_increment primary key, 
nome varchar(255), 
email varchar(255), 
telefone varchar(20), 
senha varchar(255)
);

/*Procedure para contador no dasboard */
delimiter $$
create procedure dashboard () begin 
SELECT COUNT(*) as count FROM mensagens;
SELECT COUNT(*) as count FROM audios;
SELECT COUNT(*) as count FROM documentos;
end $$ 
delimiter ;

/**Select* da procedure */
call dashboard;