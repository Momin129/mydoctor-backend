/* Replace with your SQL commands */

-- Table: public.hospital_admins

-- DROP TABLE IF EXISTS public.hospital_admins;

CREATE TABLE IF NOT EXISTS public.hospital_admins
(
    hospital_id character varying(25) COLLATE pg_catalog."default" NOT NULL,
    hospital_name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password character varying(50) COLLATE pg_catalog."default" NOT NULL,
    contact integer NOT NULL,
    enabled boolean NOT NULL DEFAULT true,
    deleted boolean NOT NULL DEFAULT false,
    CONSTRAINT hospital_admins_pkey PRIMARY KEY (hospital_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.hospital_admins
    OWNER to postgres;