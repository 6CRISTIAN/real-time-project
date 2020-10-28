CREATE TABLE public.my_friends
(
    id integer NOT NULL DEFAULT nextval('my_friends_id_seq'::regclass),
    name character varying(60) COLLATE pg_catalog."default" NOT NULL,
    gender character varying(1) COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT my_friends_pkey PRIMARY KEY (id)
)



INSERT INTO public.my_friends(
	name, gender, "createdAt", "updatedAt")
	VALUES ('Sebastián', 'M', '2020-10-28 17:03:00.86-03', '2020-10-28 17:03:00.86-03');




CREATE OR REPLACE FUNCTION notify_updated() RETURNS TRIGGER AS $$
DECLARE
	updated_values jsonb;
BEGIN
	SELECT jsonb_object_agg(n.key, n.value) INTO updated_values
	FROM jsonb_each(to_jsonb(OLD)) o
	JOIN jsonb_each(to_jsonb(NEW)) n USING (key)
	WHERE n.value IS DISTINCT FROM o.value;

	PERFORM pg_notify(
		'updated',
		json_build_object(
			'my_friend_id', NEW.id::text,
			'updated_values', updated_values
		)::text
	);

	RETURN NULL;
END;
$$ LANGUAGE plpgsql;



DROP TRIGGER IF EXISTS on_updated_friend ON my_friends;
CREATE TRIGGER on_updated_friend
AFTER UPDATE ON my_friends
FOR EACH ROW
EXECUTE PROCEDURE notify_updated();