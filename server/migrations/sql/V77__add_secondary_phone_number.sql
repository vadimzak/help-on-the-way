DO $$ 
    BEGIN
        BEGIN
            ALTER TABLE help.person ADD COLUMN phone_number_secondary text;
        EXCEPTION
            WHEN duplicate_column THEN RAISE NOTICE 'column <column_name> already exists in <table_name>.';
        END;
    END;
$$