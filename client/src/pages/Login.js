import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';

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
        <title>Login | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
        }}>
        <Container maxWidth='sm'>
          <form onSubmit={() => {}}>
            <Box sx={{ mb: 3 }}>
              <Typography color='textPrimary' variant='h2'>
                Sign in
              </Typography>
              <Typography color='textSecondary' gutterBottom variant='body2'>
                Sign in on the internal platform
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Button
                  color='primary'
                  fullWidth
                  startIcon={''}
                  onClick={() => {}}
                  size='large'
                  variant='contained'>
                  Login with Facebook
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  startIcon={''}
                  onClick={() => {}}
                  size='large'
                  variant='contained'>
                  Login with Google
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}>
              <Typography align='center' color='textSecondary' variant='body1'>
                or login with email address
              </Typography>
            </Box>
            <TextField
              error={Boolean(() => {})}
              fullWidth
              helperText={() => {}}
              label='Email Address'
              margin='normal'
              name='email'
              onBlur={() => {}}
              onChange={() => {}}
              type='email'
              value={() => {}}
              variant='outlined'
            />
            <TextField
              error={Boolean(() => {})}
              fullWidth
              helperText={() => {}}
              label='Password'
              margin='normal'
              name='password'
              onBlur={() => {}}
              onChange={() => {}}
              type='password'
              value={() => {}}
              variant='outlined'
            />
            <Box sx={{ py: 2 }}>
              <Button
                color='primary'
                disabled={() => {}}
                fullWidth
                size='large'
                type='submit'
                variant='contained'>
                Sign in now
              </Button>
            </Box>
            <Typography color='textSecondary' variant='body1'>
              Don&apos;t have an account?{' '}
              <Link component={RouterLink} to='/app/quiz' variant='h6'>
                Sign up
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
