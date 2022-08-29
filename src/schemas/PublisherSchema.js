const Yup = require('yup');

module.exports = {
  store: {
    body: Yup.object().shape({
      name: Yup.string().required().min(3).max(255),
    }).noUnknown(),
  },
  update: {
    body: Yup.object().shape({
      name: Yup.string().required().min(3).max(255),
    }),  
    params: Yup.object().shape({
      id: Yup.number().min(1).nullable(),
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