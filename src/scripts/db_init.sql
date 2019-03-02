DROP
    TABLE
        IF EXISTS task;

CREATE
    TABLE
        task ( id SERIAL PRIMARY KEY,
        task_type VARCHAR(24) NOT NULL,
        url VARCHAR(512) NOT NULL UNIQUE,
        schedule VARCHAR(32) NOT NULL,
        title VARCHAR(256),
        active BOOLEAN NOT NULL DEFAULT TRUE,
        creation_date TIMESTAMPTZ DEFAULT NOW() );

INSERT
    INTO
        public.task (task_type,
        url,
        schedule,
        title)
    VALUES('rozetka',
    'https://hard.rozetka.com.ua/dell_210_anvr/p41964776/',
    '0 0/5 * 1/1 * ? *',
    'Монитор 34" Dell P3418HW ');