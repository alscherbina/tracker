import joi from 'joi';

// POST /tasks
const addTask = {
  body: {
    data: {
      title: joi
        .string()
        .min(5)
        .max(256)
        .required(),
      url: joi
        .string()
        .uri()
        .required(),
      schedule: joi
        .string()
        .required()
        .regex(
          /^(\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|([0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])|\*\/([1-9]|1[0-2])) (\*|([0-6])|\*\/([0-6]))$/
        ),
      // TODO use type vocabulary
      type: joi.string().required()
    }
  }
};

// GET /tasks/:id
const getTask = {
  params: {
    taskId: joi
      .number()
      .integer()
      .required()
  }
};

// DELETE /tasks/:id
const deleteTask = {
  params: {
    taskId: joi
      .number()
      .integer()
      .required()
  }
};

export { getTask, deleteTask, addTask };
