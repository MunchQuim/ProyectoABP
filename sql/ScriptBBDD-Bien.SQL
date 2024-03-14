/*
Created: 05/03/2024
Modified: 11/03/2024
Model: Oracle 19c
Database: Oracle 19c
*/

-- Drop sequences section ---------------------------------------------------
DROP SEQUENCE seq_empleados_id_empleado
/
DROP SEQUENCE seq_departamentos_id_dept
/
DROP SEQUENCE seq_horas_entrada_id_fichaje
/

-- Drop relationships section -------------------------------------------------

ALTER TABLE "Empleados" DROP CONSTRAINT "fk_empleados_id_dept"
/
ALTER TABLE "Horas_entrada" DROP CONSTRAINT "fk_horas_entrada_id_empleado"
/
ALTER TABLE "Horas_entrada" DROP CONSTRAINT "fk_horas_entrada_id_dept"
/
ALTER TABLE "Rel_Permisos" DROP CONSTRAINT "fk_permisos_id_empleado"
/
ALTER TABLE "Rel_Permisos" DROP CONSTRAINT "fk_permisos_id_dept"
/
ALTER TABLE "Empleados" DROP CONSTRAINT "fk_empleados_id_jefe"
/
ALTER TABLE "Empleados" DROP CONSTRAINT "fk_empleados_id_cargo"
/

-- Drop tables section ---------------------------------------------------

DROP TABLE "Rel_Permisos"
/
DROP TABLE "Horas_entrada"
/
DROP TABLE "Cargos"
/
DROP TABLE "Departamentos"
/
DROP TABLE "Empleados"
/

-- Create tables section -------------------------------------------------

-- Table Empleados

CREATE TABLE "Empleados"(
  "id_empleado" Integer NOT NULL,
  "nombre" Varchar2(30 ) NOT NULL,
  "apellido" Varchar2(30 ) NOT NULL,
  "DNI" Varchar2(30 ) NOT NULL,
  "telefono" Varchar2(9 ) NOT NULL,
  "correo" Varchar2(30 ) NOT NULL,
  "salario" Float NOT NULL,
  "id_cargo" Varchar2(5 ) NOT NULL,
  "id_jefe" Integer,
  "id_dept" Integer
)
/

-- Create indexes for table Empleados

CREATE INDEX "IX_Rel_emp_cargos" ON "Empleados" ("id_cargo")
/

CREATE INDEX "IX_Rel_emp_jefe" ON "Empleados" ("id_jefe")
/

CREATE INDEX "IX_Relationship10" ON "Empleados" ("id_dept")
/


-- Add keys for table Empleados

ALTER TABLE "Empleados" ADD CONSTRAINT "pk_empleados_id_empleado" PRIMARY KEY ("id_empleado")
/

ALTER TABLE "Empleados" ADD CONSTRAINT "uk_empleados_telefono" UNIQUE ("telefono")
/

ALTER TABLE "Empleados" ADD CONSTRAINT "uk_empleados_correo" UNIQUE ("correo")
/

ALTER TABLE "Empleados" ADD CONSTRAINT "uk_empleados_DNI" UNIQUE ("DNI")
/


-- Table Departamentos

CREATE TABLE "Departamentos"(
  "id_dept" Integer NOT NULL,
  "nombre_dept" Varchar2(20 ) NOT NULL,
  "jefe_dept" Integer,
  "codigo_dept" Varchar2(20)
)
/

-- Add keys for table Departamentos

ALTER TABLE "Departamentos" ADD CONSTRAINT "pk_departamentos_id_dept" PRIMARY KEY ("id_dept")
/

ALTER TABLE "Departamentos" ADD CONSTRAINT "uk_departamentos_nombre_dept" UNIQUE ("nombre_dept")
/


-- Table Cargos

CREATE TABLE "Cargos"(
  "id_cargo" Varchar2(5 ) NOT NULL,
  "nombre_cargo" Varchar2(30 ) NOT NULL
)
/

-- Add keys for table Cargos

ALTER TABLE "Cargos" ADD CONSTRAINT "pk_cargos_id_cargo" PRIMARY KEY ("id_cargo")
/

ALTER TABLE "Cargos" ADD CONSTRAINT "uk_cargos_nombre" UNIQUE ("nombre_cargo")
/


-- Table Horas_entrada

CREATE TABLE "Horas_entrada"(
  "id_fichaje" Integer NOT NULL,
  "id_dept" Integer NOT NULL,
  "id_empleado" Integer NOT NULL,
  "hora_entrada" TIMESTAMP default CURRENT_TIMESTAMP
)
/

-- Create indexes for table Horas_entrada

CREATE INDEX "IX_Relationship5" ON "Horas_entrada" ("id_dept")
/

CREATE INDEX "IX_Relationship6" ON "Horas_entrada" ("id_empleado")
/

-- Add keys for table Horas_entrada

ALTER TABLE "Horas_entrada" ADD CONSTRAINT "pk_horas_entrada_id_fichaje" PRIMARY KEY ("id_fichaje")
/


-- Table Rel_Permisos

CREATE TABLE "Rel_Permisos"(
  "id_dept" Integer NOT NULL,
  "id_empleado" Integer NOT NULL
)
/

-- Add keys for table Rel_Permisos

ALTER TABLE "Rel_Permisos" ADD CONSTRAINT "pk_rel_permisos" PRIMARY KEY ("id_dept","id_empleado")
/


-- Create foreign keys (relationships) section ------------------------------------------------- 

ALTER TABLE "Empleados" ADD CONSTRAINT "fk_empleados_id_cargo" FOREIGN KEY ("id_cargo") REFERENCES "Cargos" ("id_cargo")
/

ALTER TABLE "Empleados" ADD CONSTRAINT "fk_empleados_id_jefe" FOREIGN KEY ("id_jefe") REFERENCES "Empleados" ("id_empleado")
/

ALTER TABLE "Rel_Permisos" ADD CONSTRAINT "fk_permisos_id_dept" FOREIGN KEY ("id_dept") REFERENCES "Departamentos" ("id_dept")
/

ALTER TABLE "Rel_Permisos" ADD CONSTRAINT "fk_permisos_id_empleado" FOREIGN KEY ("id_empleado") REFERENCES "Empleados" ("id_empleado")
/

ALTER TABLE "Horas_entrada" ADD CONSTRAINT "fk_horas_entrada_id_dept" FOREIGN KEY ("id_dept") REFERENCES "Departamentos" ("id_dept")
/

ALTER TABLE "Horas_entrada" ADD CONSTRAINT "fk_horas_entrada_id_empleado" FOREIGN KEY ("id_empleado") REFERENCES "Empleados" ("id_empleado")
/

ALTER TABLE "Empleados" ADD CONSTRAINT "fk_empleados_id_dept" FOREIGN KEY ("id_dept") REFERENCES "Departamentos" ("id_dept")
/


-- Create sequences

CREATE SEQUENCE seq_empleados_id_empleado
                INCREMENT BY 1
                START WITH 1;

CREATE SEQUENCE seq_departamentos_id_dept
                INCREMENT BY 1
                START WITH 1;
CREATE SEQUENCE seq_horas_entrada_id_fichaje
                INCREMENT BY 1
                START WITH 1;


------

-- INSERTS CARGOS
INSERT INTO "Cargos" VALUES ('CEO', 'Director');
INSERT INTO "Cargos" VALUES ('INVSR', 'Investigador senior');
INSERT INTO "Cargos" VALUES ('INVJR', 'Investigador junior');
INSERT INTO "Cargos" VALUES ('ADMR', 'Administrativo');
INSERT INTO "Cargos" VALUES ('SCRT', 'Sectretario');

-- INSERTS TABLA DEPARTAMENTOS

INSERT INTO "Departamentos" ("id_dept", "nombre_dept", "codigo_dept") VALUES (seq_departamentos_id_dept.nextval, 
                                    'Laboratorio',
                                    'L480R470R10'
                                    );
                                    
INSERT INTO "Departamentos" ("id_dept", "nombre_dept", "codigo_dept") VALUES (seq_departamentos_id_dept.nextval, 
                                    'Administracion',
                                    '4DM1N157R4C10N'
                                    );
                                    
INSERT INTO "Departamentos" ("id_dept", "nombre_dept", "codigo_dept") VALUES (seq_departamentos_id_dept.nextval, 
                                    'Direccion',
                                    'D1R3CC10N'
                                    );



-- INSERTS EMPLEADOS
INSERT INTO "Empleados" VALUES (seq_empleados_id_empleado.nextval, 
                                'David', 
                                'Girbau', 
                                '43627182G', 
                                '643779212', 
                                'davgir@gmail.com',
                                '1000000', 
                                (SELECT "id_cargo" FROM "Cargos" WHERE "nombre_cargo" = 'Director'),
                                '',
                                (SELECT "id_dept" FROM "Departamentos" WHERE "nombre_dept" = 'Direccion')
                                );
                                
INSERT INTO "Empleados" VALUES (seq_empleados_id_empleado.nextval, --id
                                'Joaquim', --nombre
                                'Pineda', --apellido
                                '43284918P', --dni
                                '643660199', --telefono
                                'joapinsot@campus.monlau.com', --mail
                                '250000', --salario
                                (SELECT "id_cargo" FROM "Cargos" WHERE "nombre_cargo" = 'Investigador senior'), --cargo
                                (SELECT "id_empleado" FROM "Empleados" WHERE "nombre"||' '||"apellido" = 'David Girbau'), --jefe
                                (SELECT "id_dept" FROM "Departamentos" WHERE "nombre_dept" = 'Laboratorio') --departamento
                                );
                                
INSERT INTO "Empleados" VALUES (seq_empleados_id_empleado.nextval, 
                                'Oscar', 
                                'Quintanilla', 
                                '49543172Q', 
                                '612394954', 
                                'oscquirid@campus.monlau.com',
                                '200000', 
                                (SELECT "id_cargo" FROM "Cargos" WHERE "nombre_cargo" = 'Administrativo'),
                                (SELECT "id_empleado" FROM "Empleados" WHERE "nombre"||' '||"apellido" = 'David Girbau'),
                                (SELECT "id_dept" FROM "Departamentos" WHERE "nombre_dept" = 'Administracion')
                                );
                                
INSERT INTO "Empleados" VALUES (seq_empleados_id_empleado.nextval, 
                                'Unai', 
                                'Ruiz', 
                                '45678901R', 
                                '633556509', 
                                'unaruisan@campus.monlau.com',
                                '150000', 
                                (SELECT "id_cargo" FROM "Cargos" WHERE "nombre_cargo" = 'Investigador junior'),
                                (SELECT "id_empleado" FROM "Empleados" WHERE "nombre"||' '||"apellido" = 'Joaquim Pineda'),
                                (SELECT "id_dept" FROM "Departamentos" WHERE "nombre_dept" = 'Laboratorio')
                                );
                                
INSERT INTO "Empleados" VALUES (seq_empleados_id_empleado.nextval, 
                                'Ivan', 
                                'Simon', 
                                '49910818J', 
                                '674669280', 
                                'ivasimmer@campus.monlau.com',
                                '100000', 
                                (SELECT "id_cargo" FROM "Cargos" WHERE "nombre_cargo" = 'Investigador junior'),
                                (SELECT "id_empleado" FROM "Empleados" WHERE "nombre"||' '||"apellido" = 'Joaquim Pineda'),
                                (SELECT "id_dept" FROM "Departamentos" WHERE "nombre_dept" = 'Laboratorio')
                                );
                                
INSERT INTO "Empleados" VALUES (seq_empleados_id_empleado.nextval, 
                                'Aleix', 
                                'Garcia', 
                                '47314212G', 
                                '623156794', 
                                'alegaragu@gmail.com',
                                '50000', 
                                (SELECT "id_cargo" FROM "Cargos" WHERE "nombre_cargo" = 'Administrativo'),
                                (SELECT "id_empleado" FROM "Empleados" WHERE "nombre"||' '||"apellido" = 'Oscar Quintanilla'),
                                (SELECT "id_dept" FROM "Departamentos" WHERE "nombre_dept" = 'Administracion')
                                );
                                
INSERT INTO "Empleados" VALUES (seq_empleados_id_empleado.nextval, 
                                'Juan', 
                                'Perez', 
                                '41550821P', 
                                '672610505', 
                                'juanperez@gmail.com',
                                '120000', 
                                (SELECT "id_cargo" FROM "Cargos" WHERE "nombre_cargo" = 'Administrativo'),
                                (SELECT "id_empleado" FROM "Empleados" WHERE "nombre"||' '||"apellido" = 'Oscar Quintanilla'),
                                (SELECT "id_dept" FROM "Departamentos" WHERE "nombre_dept" = 'Administracion')
                                );
                                


                                

-- UPDATE TABLA DEPARTAMENTOS
UPDATE "Departamentos" 
SET "jefe_dept" = (SELECT "id_empleado" 
                   FROM "Empleados" 
                   WHERE "nombre"||' '||"apellido" = 'Joaquim Pineda') 
WHERE "nombre_dept" = 'Laboratorio';

UPDATE "Departamentos" 
SET "jefe_dept" = (SELECT "id_empleado" 
                   FROM "Empleados" 
                   WHERE "nombre"||' '||"apellido" = 'Oscar Quintanilla') 
WHERE "nombre_dept" = 'Administracion';

UPDATE "Departamentos" 
SET "jefe_dept" = (SELECT "id_empleado" 
                   FROM "Empleados" 
                   WHERE "nombre"||' '||"apellido" = 'David Girbau')
WHERE "nombre_dept" = 'Direccion';
commit;
--INSERTAR PERMISOS
/
DECLARE
    CURSOR c_pineda_cur is
    SELECT e."id_dept", e."id_empleado", d."nombre_dept" from "Empleados" e
    join "Departamentos" d on d."id_dept" = e."id_dept";
    --x employees%rowtype;
BEGIN 
    FOR registro IN c_pineda_cur LOOP
        dbms_output.put_line (registro."id_dept");
        if registro."nombre_dept"='Direccion' then
            insert into "Rel_Permisos" values (1,registro."id_empleado");
            insert into "Rel_Permisos" values (2,registro."id_empleado");
            insert into "Rel_Permisos" values (3,registro."id_empleado");
        else
            insert into "Rel_Permisos" values (registro."id_dept",registro."id_empleado");
        end if;
        commit;
        
    END LOOP;

END;


 --INSERT INTO "Rel_permisos" VALUES
/*
-- INSERTS TABLA HORAS_ENTRADA
INSERT INTO "Horas_entrada" VALUES (seq_horas_entrada_id_fichaje.nextval,
                                    (SELECT "id_dept" FROM "Departamentos" WHERE "nombre_dept" = 'Laboratorio'),
                                    (SELECT "id_empleado" FROM "Empleados" WHERE "apellido" = 'Simon'),
                                    DEFAULT
                                    );
                                    
INSERT INTO "Horas_entrada" VALUES (seq_horas_entrada_id_fichaje.nextval,
                                    (SELECT "id_dept" FROM "Departamentos" WHERE "nombre_dept" = 'Direccion'),
                                    (SELECT "id_empleado" FROM "Empleados" WHERE "apellido" = 'Garcia'),
                                    DEFAULT
                                    );
                                    
INSERT INTO "Horas_entrada" VALUES (seq_horas_entrada_id_fichaje.nextval,
                                    (SELECT "id_dept" FROM "Departamentos" WHERE "nombre_dept" = 'Administracion'),
                                    (SELECT "id_empleado" FROM "Empleados" WHERE "apellido" = 'Perez'),
                                    DEFAULT
                                    );
*/