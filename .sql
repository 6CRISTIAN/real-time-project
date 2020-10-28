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