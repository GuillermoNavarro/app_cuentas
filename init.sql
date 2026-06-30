CREATE TABLE hogar (
	id_hogar  BIGINT AUTO_INCREMENT PRIMARY KEY,
	nombre varchar (100) NOT NULL
);

CREATE TABLE usuario (
	id_usuario  BIGINT AUTO_INCREMENT PRIMARY KEY,
	nombre varchar (100) NOT NULL,
	password varchar (255) NOT NULL DEFAULT '$2a$10$o51IvtAMVqeGUOtAqKPSMOZR1fml/QECe46WpCgqSM0ytXn2buePO',
       	email varchar (100) NOT NULL UNIQUE,
	cambiar_pass boolean NOT NULL DEFAULT TRUE,
	id_hogar BIGINT NOT NULL
);

CREATE TABLE previsto (
	id_previsto BIGINT AUTO_INCREMENT PRIMARY KEY,
	detalle varchar (100) NOT NULL,
	fecha_inicio date NOT NULL,
	fecha_fin date NOT NULL,
	importe decimal (10, 2) NOT NULL,
	tipo ENUM('ingreso', 'gasto') NOT NULL,
       	id_hogar BIGINT NOT NULL
);

CREATE TABLE recibo (
	id_recibo BIGINT AUTO_INCREMENT PRIMARY KEY,
	id_previsto BIGINT NULL,
	id_hogar BIGINT NOT NULL,
	fecha date NOT NULL,
	importe decimal (10, 2) NOT NULL,
	tipo ENUM('ingreso', 'gasto') NOT NULL,
	detalle varchar (100) NOT NULL,
	estado boolean NOT NULL DEFAULT FALSE
);
     
ALTER TABLE usuario ADD CONSTRAINT fk_usuario_hogar FOREIGN KEY (id_hogar) REFERENCES hogar (id_hogar) ON DELETE CASCADE;
ALTER TABLE previsto ADD CONSTRAINT fk_previsto_hogar  FOREIGN KEY (id_hogar) REFERENCES hogar (id_hogar) ON DELETE CASCADE;
ALTER TABLE recibo ADD CONSTRAINT fk_recibo_hogar FOREIGN KEY (id_hogar) REFERENCES hogar (id_hogar) ON DELETE CASCADE;
ALTER TABLE recibo ADD CONSTRAINT fk_recibo_previsto FOREIGN KEY (id_previsto) REFERENCES previsto (id_previsto) ON DELETE CASCADE;
