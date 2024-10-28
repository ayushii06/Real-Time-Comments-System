'use client';
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);

  const handleClick = () => {
    if (username === "") {
      setError(true);
      return;
    }
    console.log("Username: ", username);
    window.location.href = `/${username}/comments`;

    axios.post("http://localhost:5050/api/login", {
      username: username
    })
    .then((response) => {
      console.log("Username posted: ", response.data);
    })
    .catch((error) => {
      console.error("Error posting username: ", error);
    });
  };

  return (
    <>
      {error && (
        <Snackbar 
          open={error} 
          autoHideDuration={2000} 
          onClose={() => setError(false)} 
          message="Please enter a username" 
        />
      )}
      <Box sx={{ marginTop: { xs: 5, md: 10 }, marginBottom: { xs: 3, md: 5 } }}>
        <Typography 
          sx={{ fontWeight: "medium", fontSize: { xs: "h5.fontSize", md: "h4.fontSize" } }} 
          variant="h4" 
          align="center" 
          gutterBottom
        >
          Join the Conversation in Real Time!
        </Typography>
      </Box>

      <Typography 
        sx={{ fontSize: { xs: "body1.fontSize", md: "h6.fontSize" } }} 
        variant="h6" 
        align="center" 
        gutterBottom
      >
        Create your username to get started!
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          '& .MuiTextField-root': { 
            m: 2, 
            width: { xs: '90%', sm: '70ch' } 
          }
        }}
        component="form"
        align="center"
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="outlined-required"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <Button 
          variant="contained" 
          onClick={handleClick}
          sx={{
            width: { xs: '80%', sm: 'auto' },
            mt: 2
          }}
        >
          Register
        </Button>
      </Box>
    </>
  );
}
