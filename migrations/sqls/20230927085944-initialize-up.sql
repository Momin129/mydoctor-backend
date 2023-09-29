/* Replace with your SQL commands */

-- Table: public.hospital_admins

-- DROP TABLE IF EXISTS public.hospital_admins;




CREATE TABLE IF NOT EXISTS public.patients
(
    patient_id character varying(25) COLLATE pg_catalog."default" NOT NULL,
    name character varying(40) COLLATE pg_catalog."default" NOT NULL,
    email character varying(40) COLLATE pg_catalog."default" NOT NULL,
    password character varying(50) COLLATE pg_catalog."default" NOT NULL,
    contact integer NOT NULL,
    gender character varying(10) COLLATE pg_catalog."default" NOT NULL,
    dob date NOT NULL,
    address jsonb,
    enabled boolean DEFAULT true,
    deleted boolean DEFAULT false,
    CONSTRAINT patients_pkey PRIMARY KEY (patient_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.patients
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.doctors
(
    doctor_id character varying(25) COLLATE pg_catalog."default" NOT NULL,
    "licenceNumber" integer,
    languages character varying[] COLLATE pg_catalog."default",
    specializations character varying[] COLLATE pg_catalog."default",
    experience jsonb,
    qualification jsonb,
    bio text COLLATE pg_catalog."default",
    enabled boolean DEFAULT true,
    deleted boolean DEFAULT false,
    user_id character varying(25) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT doctors_pkey PRIMARY KEY (doctor_id),
    CONSTRAINT doctors_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.patients (patient_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.doctors
    OWNER to postgres;





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




CREATE TABLE IF NOT EXISTS public.slots
(
    slot_id character varying(25) COLLATE pg_catalog."default" NOT NULL,
    doctor_id character varying(25) COLLATE pg_catalog."default" NOT NULL,
    date date NOT NULL,
    "startTime" time without time zone NOT NULL,
    "endTime" time without time zone NOT NULL,
    "noOfSlots" integer NOT NULL,
    "slotsBooked" integer NOT NULL,
    deleted boolean DEFAULT false,
    CONSTRAINT slots_pkey PRIMARY KEY (slot_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.slots
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.specialities
(
    speciality_id character varying(25) COLLATE pg_catalog."default" NOT NULL,
    speciality_name character varying(40) COLLATE pg_catalog."default" NOT NULL,
    image_url character varying COLLATE pg_catalog."default" NOT NULL,
    enabled boolean DEFAULT true,
    deleted boolean DEFAULT false,
    CONSTRAINT specialities_pkey PRIMARY KEY (speciality_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.specialities
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.appointments
(
    appointment_id character varying(25) COLLATE pg_catalog."default" NOT NULL,
    patient_id character varying(25) COLLATE pg_catalog."default" NOT NULL,
    dcotor_id character varying(25) COLLATE pg_catalog."default" NOT NULL,
    slot_id character varying(25) COLLATE pg_catalog."default" NOT NULL,
    status character varying(25) COLLATE pg_catalog."default",
    deleted boolean NOT NULL DEFAULT false,
    CONSTRAINT appointments_pkey PRIMARY KEY (appointment_id),
    CONSTRAINT doctor_id FOREIGN KEY (dcotor_id)
        REFERENCES public.doctors (doctor_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT patient_id FOREIGN KEY (patient_id)
        REFERENCES public.patients (patient_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT slot_id FOREIGN KEY (slot_id)
        REFERENCES public.slots (slot_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.appointments
    OWNER to postgres;