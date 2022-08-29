const Yup = require('yup');

const schema = {
  store: {
    body: Yup.object().shape({
      name: Yup.string().required("Name is required.").min(3).max(255),
      registration: Yup.number().required("Registration is required."),
      birth_date: Yup.date().required("Birth date is required."),
    }),
    params: Yup.object().shape({
      user_id: Yup.number(),
    }),
  },
  update: {
    body: Yup.object().shape({
      name: Yup.string().required("Name is required.").min(3).max(255),
      registration: Yup.number().required("Registration is required."),
      birth_date: Yup.date().required("Birth date is required"),
    }),
    params: Yup.object().shape({
      id: Yup.number(),
    }),
  },
  show: {
    params: Yup.object().shape({
      id: Yup.number().min(1).nullable(),
    }),
  },
  delete: {
    params: Yup.object().shape({
      id: Yup.number().required(),
    }),
  },
}

module.exports = schema;