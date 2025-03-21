import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper, Alert } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    try {
      dispatch(login(data));
      navigate('/home');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={15} sx={{ p: 4, mt: 5, borderRadius: 3 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom color="#2ebf91">Login</Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit(onSubmit)}>
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
              Login
            </Button>
          </form>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Don't have an account? <Link to="/register">Register here</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
