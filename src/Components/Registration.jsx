import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { register as registerUser } from '../Redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert, Fade, Paper } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
  .string()
  .email("Invalid email")
  .matches(
     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Email must be a valid"
  )
  .required("Email is required"),

  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successAlert, setSuccessAlert] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    setSuccessAlert(true);

    setTimeout(() => {
      setSuccessAlert(false);
      navigate('/login');
    }, 3000);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={15} sx={{ p: 4, mt: 5, borderRadius: 3 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom color="#2ebf91">Register</Typography>
          {successAlert && (
            <Fade in={successAlert}>
              <Alert severity="success" sx={{ mb: 2 }}>Registration Successful! Redirecting...</Alert>
            </Fade>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField 
              {...register('name')} 
              label="Name" 
              fullWidth 
              margin="normal" 
              error={!!errors.name} 
              helperText={errors.name?.message} 
              sx={{
                '& .MuiOutlinedInput-root': { borderRadius: 3 },
              }}
            />
            <TextField 
              {...register('email')} 
              label="Email" 
              fullWidth 
              margin="normal" 
              error={!!errors.email} 
              helperText={errors.email?.message} 
              sx={{
                '& .MuiOutlinedInput-root': { borderRadius: 3 },
              }}
            />
            <TextField 
              {...register('password')} 
              label="Password" 
              type="password" 
              fullWidth 
              margin="normal" 
              error={!!errors.password} 
              helperText={errors.password?.message} 
              sx={{
                '& .MuiOutlinedInput-root': { borderRadius: 3 },
              }}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ 
                mt: 3, 
                py: 1, 
                fontSize: '1rem', 
                fontWeight: 'bold', 
                borderRadius: 3,
                transition: '0.3s',
                '&:hover': {
                  backgroundColor: '#2ebf91'
                }
              }}>
              Register
            </Button>
          </form>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Already have an account? <Link to="/login">Login here</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Registration;
