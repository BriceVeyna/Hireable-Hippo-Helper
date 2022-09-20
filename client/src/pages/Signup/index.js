import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid container justifyContent="center" sx={{marginTop: "50px"}}>
      <Grid item xl={4} lg={6} md={8} sm={10} xs={12}>
        <Card elevation={15} sx={{borderRadius: 3}}>

          <Typography component="div" variant="h3" sx={{textAlign: "center", padding: "25px", fontWeight: "bold"}}>
            Signup
          </Typography>

          <Box>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <CardContent component="form" onSubmit={handleFormSubmit}>

                <FormControl fullWidth sx={{padding:"65px 75px 0 75px"}}>
                  <InputLabel htmlFor='username'>
                    <Typography variant="h5" sx={{paddingLeft:"65px", marginTop: "5px", fontWeight: "bold"}}>
                      Username
                    </Typography>
                  </InputLabel>
                  <TextField
                    name="username"
                    placeholder="Your username"
                    value={formState.name}
                    onChange={handleChange}
                    InputProps={{ endAdornment: <InputAdornment position="end"> <PersonIcon /> </InputAdornment> }}
                  />
                </FormControl>

                <FormControl fullWidth sx={{padding:"75px 75px 0 75px"}}>
                  <InputLabel htmlFor='email'>
                    <Typography variant="h5" sx={{paddingLeft:"65px", marginTop: "15px", fontWeight: "bold"}}>
                      Email
                    </Typography>
                  </InputLabel>
                  <TextField
                    name="email"
                    placeholder="Your email"
                    value={formState.email}
                    onChange={handleChange}
                    InputProps={{ endAdornment: <InputAdornment position="end"> <EmailIcon /> </InputAdornment> }}
                  />
                </FormControl>

                <FormControl fullWidth sx={{padding:"75px 75px 0 75px"}}>
                  <InputLabel htmlFor='password'>
                    <Typography variant="h5" sx={{paddingLeft:"65px", marginTop: "15px", fontWeight: "bold"}}>
                        Password
                      </Typography>
                  </InputLabel>
                  <TextField
                    name="password"
                    placeholder="********"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                    InputProps={{ endAdornment: <InputAdornment position="end"> <LockIcon /> </InputAdornment> }}
                  />
                </FormControl>

                <FormControl fullWidth sx={{padding:"50px 75px 50px 75px"}}>
                  <Button variant="contained" size="large" type="submit" sx={{borderRadius: 6, padding:"12px", fontWeight: "bold"}}>Signup</Button>
                </FormControl>

                <Divider variant="middle" />

                <p style={{"textAlign": "center", "padding": "35px"}}>
                  Already have an account?{' '}
                  <Link to="/Login">Login here.</Link>
                </p>
                
              </CardContent>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Signup;