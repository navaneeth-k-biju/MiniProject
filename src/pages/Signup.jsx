import React from "react";
import './Login.css'
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const Signup = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false)
    const [rationcard, setRationCard] = useState()
    const url = "http://localhost:3000"
    const handleRationcardChange = (event) => {
        const value = event.target.value;
        setRationCard(value);
        const regex = /^\d{12}$/;
        setError(!regex.test(value));
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const loginServer = (cred) => {
        console.log(cred)
        var form = new FormData()
        form.append('name', cred.name);
        form.append('password', cred.password)
        form.append('rationcard', cred.rationcard)
        axios.post(url + "/signup", form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            console.log(res.data)
            if (typeof (res.data) !== "string") {
                setErr("")
                setSuccess("login successfull")
                localStorage.setItem('login', JSON.stringify(res.data[0]))
                console.log(JSON.parse(localStorage.getItem('login')))
                navigate('/login')
            } else {
                setErr(res.data)
                setSuccess("")
            }
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div className="main">
            <Paper sx={{ display: 'flex', width: '30%', minHeight: "50%", height: 'fit-content', backgroundColor: 'white', borderRadius: "10px", flexDirection: 'column', alignItems: "center", justifyContent: "space-between" }}>
                <Typography className="Head" variant='h5' noWrap component="div" sx={{ mr: 2, width: '100%', display: { xs: 'none', md: 'flex', justifyContent: "center", paddingTop: "10px", paddingBottom: "10px", width: '100%', marginRight: "0px", paddingRight: "0px" } }} >
                    Sign up
                </Typography>
                <Box>
                    <TextField
                        onChange={(eve) => {
                            setErr("")
                            setUsername(eve.target.value)
                        }}
                        sx={{
                            width: "90%",
                            paddingBottom: '10px'
                        }}
                        label="enter your name"
                    />
                    <TextField
                        type={showPassword ? 'text' : 'password'} // Set password type dynamically
                        onChange={(eve) => {
                            setErr("");
                            setPassword(eve.target.value);
                        }}
                        sx={{
                            width: "90%",
                            paddingBottom: '10px'
                        }}
                        label="Enter your password"
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    onClick={handleTogglePasswordVisibility}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            ),
                        }}
                    />
                    <TextField
                        label="Enter your rationcard (12 digits)"
                        type="number" // Input type for numeric keyboard
                        inputProps={{ maxLength: 12 }} // Limit input length
                        value={rationcard}
                        sx={{ width: "90%" }}
                        onChange={handleRationcardChange}
                        error={error} // Optional: Display error if number of digits is invalid
                        helperText={error ? 'Please enter a valid 12-digit ration card number' : ''} // Optional: Error message
                    />
                </Box>

                <Box>
                    <Link to={"/login"}>Already have Account</Link>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            margin: "10px"
                        }}
                        onClick={(eve) => {
                            if (username === "" || password === "") {
                                setErr("Fill the required fields")
                            } else if (String(rationcard).length !== 12) {
                                setError(true)
                            } else {
                                loginServer({
                                    name: username,
                                    password: password,
                                    rationcard: rationcard
                                })
                            }
                        }}
                    >login</Button>
                </Box>

                <Typography variant="p" sx={{ color: "red", padding: 1, width: "100%" }}>
                    {err}
                </Typography>
                <Typography variant="p" sx={{ color: "primary.dark", padding: 1, width: "100%" }}>
                    {success}
                </Typography>

            </Paper>
        </div>
    )
}
export default Signup