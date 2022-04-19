import * as React from 'react';
import {Helmet} from 'react-helmet';

const Login = () => {
  // const navigate = useNavigate();

  // const formik = useFormik({
  //   initialValues: {
  //     email: 'demo@devias.io',
  //     password: 'Password123',
  //   },
  //   validationSchema: Yup.object().shape({
  //     email: Yup.string()
  //       .email('Must be a valid email')
  //       .max(255)
  //       .required('Email is required'),
  //     password: Yup.string().max(255).required('Password is required'),
  //   }),
  //   onSubmit: () => {
  //     navigate('/app/quiz', { replace: true });
  //   },
  // });

  return (
    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Login | Examinator</title>
    </Helmet>
    <p>Login Page</p>
    </>
  );
};

export default Login;
