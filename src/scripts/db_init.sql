DROP
    TABLE
        IF EXISTS task;

CREATE
    TABLE
        task ( id SERIAL PRIMARY KEY,
        type VARCHAR(24) NOT NULL,
        url VARCHAR(512) NOT NULL UNIQUE,
        schedule VARCHAR(32) NOT NULL,
        title VARCHAR(256),
        active BOOLEAN NOT NULL DEFAULT TRUE,
        creation_date TIMESTAMPTZ DEFAULT NOW(TIMESTAMPTZ DEFAULT NOW() );


CREATE TABLE journal (
task_id INTEGER NOT NULL,
execution_date TIMESTAMPTZ DEFAULT NOW(),
result VARCHAR(256),
CONSTRAINT unique_journal_record UNIQUE(task_id, execution_date),
CONSTRAINT fk_journal_task FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE
)

INSERT
    INTO
        public.task (type,
        url,
        schedule,
        title)
    VALUES('rozetka',
    'https://hard.rozetka.com.ua/dell_210_anvr/p41964776/',
    '0 0/5 * 1/1 * ? *',
    'Монитор 34" Dell P3418HW ');