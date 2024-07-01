import React, { useState } from "react";
import './Login.css'
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const Login = ({ handleCredential }) => {
    const navigate = useNavigate()
    const [rationcard, setRationCard] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const url = "http://localhost:3000"
    const regex = /^\d{12}$/;
    const handleRationcardChange = (event) => {
        const value = event.target.value;
        console.log(isNaN(value))
        setRationCard(value);
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
        axios.post(url + "/auth", form, {
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
                navigate('/home')
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
            <Paper sx={{ width: '30%', minHeight: "50%", display: "flex", height: 'fit-content', backgroundColor: 'white', borderRadius: "10px", flexDirection: 'column', justifyContent: "space-between", alignItems: "center" }}>
                <Typography className="Head" variant='h5' noWrap component="div" sx={{ mr: 2, width: '100%', display: { xs: 'none', md: 'flex', justifyContent: "center", paddingTop: "10px", paddingBottom: "10px", width: '100%', marginRight: "0px" } }} >
                    Login
                </Typography>
                <Box>
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
                </Box>

                <Box>
                    <Link to={"/signup"}>Create have Account</Link>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            margin: "10px"
                        }}
                        onClick={(eve) => {
                            if (rationcard === "" || password === "" ||!regex.test(rationcard)) {
                                setErr("Fill the required fields")
                            } else {
                                loginServer({
                                    name: rationcard,
                                    password: password
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
export default Login