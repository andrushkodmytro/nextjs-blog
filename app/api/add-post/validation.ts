import * as Yup from 'yup';

export const addPostScheme = Yup.object().shape({
  title: Yup.string().max(500, 'Too Long!').required('Title is required'),
  body: Yup.string().max(50000, 'Too Long!').required('Body is required'),
  slug: Yup.string().required('Slug is required'),
  author: Yup.string().max(100, 'Too Long!').required('Author is required'),
  img: Yup.string().max(1000, 'Too Long!').required('Post image is Required'),
  categoryId: Yup.string()
    .max(100, 'Too Long!')
    .required('categoryId is required'),
});
