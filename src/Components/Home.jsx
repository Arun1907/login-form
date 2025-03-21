import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/authSlice';
import { Button, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Container maxWidth="sm">
    <Paper elevation={15} sx={{ p: 4, mt: 5, borderRadius: 3 }}>
      <Typography variant="h4" gutterBottom color="#2ecf96">Welcome, {user?.name}</Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
      </Paper>
    </Container>
  );
};

export default Home;
