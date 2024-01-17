import * as Yup from 'yup';

export const addCommentScheme = Yup.object().shape({
  author: Yup.string().max(100, 'Too Long!').required('Author is required'),
  body: Yup.string().max(5000, 'Too Long!').required('Body is required'),
  postSlug: Yup.string().max(500, 'Too Long!').required('Title is required'),
});
