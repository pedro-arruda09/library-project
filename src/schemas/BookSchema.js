const Yup = require('yup');

module.exports = {
  store: {
    body: Yup.object().shape({
      name: Yup.string().required().min(3).max(255),
      synopsis: Yup.string().required().min(3).max(255),
      publish_date: Yup.date().required(),
      publisher_id: Yup.number().required(),
      author_id: Yup.number().required()
    }).noUnknown(),
  },
  update: {
    body: Yup.object().shape({
      name: Yup.string().required().min(3).max(255),
      synopsis: Yup.string().required().min(3).max(255),
      publish_date: Yup.date().required(),
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
  sendBookToDb: {
    body: Yup.object({
      book_cover_id: Yup.number()
    }).noUnknown(),
    params: Yup.object({
      id: Yup.number().min(1).required()
    }).noUnknown()
  }
}