'use client';
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Snackbar from '@mui/material/Snackbar';

export default function Comments() {
    const [socket, setSocket] = useState(undefined);
    const [data, setData] = useState([]);
    const [comment, setComment] = useState("");
    const [error, setError] = useState(false);
    
    const pathname = usePathname();
    const username = pathname.split("/")[1];

    useEffect(() => {
        const newSocket = io("http://localhost:3001");
        newSocket.on("newComment", (comment) => {
            setData((prevData) => [comment, ...prevData]);
        });
        setSocket(newSocket);

        return () => {
            newSocket.disconnect(); // Cleanup socket connection on unmount
        };
    }, []);

    useEffect(() => {
        axios.get("http://localhost:5050/api/comments")
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    const handleSubmit = () => {
        if(comment.trim() === "") {
            setError(true);
            return;
        }
        if (comment.trim()) {
            axios.post("http://localhost:5050/api/comments", {
                username: username,
                comment: comment
            })
            .then((response) => {
                console.log("Comment posted: ", response.data);
                setComment("");
            })
            .catch((error) => {
                console.error("Error posting comment: ", error);
            });

            socket.emit("newComment", {
                username: username,
                comment: comment,
                timestamp: new Date().toISOString()
            });
            setComment("");
        }
    };

    return (
        <>
            {error && ( 
                <Snackbar 
                    open={error} 
                    autoHideDuration={2000} 
                    onClose={() => setError(false)} 
                    message="Please enter a comment" 
                />
            )}
            <Box
                component="form"
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    flexDirection: { xs: 'column', md: 'row' },
                    '& .MuiTextField-root': { m: 2, width: { xs: '80%', md: '60ch' } },
                    mb: 4,
                    p: 2
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-required"
                    label="Add a comment..."
                    margin="dense"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    variant="outlined"
                    
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    onClick={handleSubmit}
                    sx={{
                        mt: { xs: 2, md: 0 },
                        ml: { md: 2 },
                        bgcolor: "#3b82f6",
                        "&:hover": {
                            bgcolor: "#2563eb",
                        },
                        borderRadius: 2,
                        boxShadow: 3
                    }}
                >
                    Submit
                </Button>
            </Box>

            <div align='center'>
            {
                data.length === 0 ? (
                    <Typography variant="h5" sx={{ mt: 4, color: 'gray' }}>No comments yet. Be the first to comment!</Typography>
                ) : (
                    data.map((comment, index) => (
                        <Card 
                            key={index} 
                            align='left' 
                            sx={{ 
                                maxWidth: 500, 
                                width: "90%", 
                                mb: 3, 
                                boxShadow: 3, 
                                borderRadius: 2,
                                transition: "transform 0.2s",
                                "&:hover": { transform: "scale(1.02)" }
                            }}
                        >
                            <CardHeader 
                                avatar={
                                    <Avatar sx={{ bgcolor: "#3b82f6" }}>
                                        {comment.username.charAt(0).toUpperCase()}
                                    </Avatar>
                                }
                                title={<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{comment.username}</Typography>}
                                subheader={new Date(comment.timestamp).toLocaleString()}
                                sx={{ pb: 0 }}
                            />
                            <CardContent>
                                <Typography variant="body1" component="p" color="text.secondary">
                                    {comment.comment}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                )
            }
            </div>
        </>
    );
}
