const Yup = require('yup');

module.exports = {
  store: {
    body: Yup.object().shape({
        bookCover: Yup.object().required(),
        book_id: Yup.string().required(),
    })
  },
  update: {
    body: Yup.object().shape({
    }),  
    params: Yup.object().shape({
      id: Yup.number().min(1).nullable(),
    }),   
  },
  delete: {
    params: Yup.object().shape({
      id: Yup.number().required(),
    }),
  }
}