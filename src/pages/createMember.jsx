import React, { useEffect, useState } from "react";
import { Autocomplete, Box, Button, ImageList, ImageListItem, Paper, TextField, Typography } from "@mui/material";
import { Form, json } from "react-router-dom";
import { Female, Height } from "@mui/icons-material";
import image from '../assets/img/135188-qkbxsgovsx-1584709357.jpg'
import axios from "axios";
import { DeleteModal } from "../components/Home/DeleteModal";
export const CreateMember = ({ member }) => {
    const gender = ['male', 'female']
    const [inputName, setInputName] = useState('')
    const [inputAge, setInputAge] = useState('')
    const [inputGender, setInputGender] = useState()
    const [inputNumber, setInputNumber] = useState(1000000000)
    const [inputImage, setInputImage] = useState(null)
    const [inputProof1, setInputProof1] = useState(null)
    const [inputProof2, setInputProof2] = useState(null)
    const [response, setResponse] = useState(null)
    const [success, setSuccess] = useState()
    useEffect(() => {
        if (response != null) {

        }
    }, [response])
    useEffect(() => {
        console.log(inputGender, inputImage, inputProof1, inputProof2)
    }, [inputGender, inputImage, inputProof1, inputProof2])
    return (
        <Box
            sx={{ width: "99%", padding: 1, overflow: "hidden" }}
        >
            <Typography variant="h4">
                Add Member
            </Typography>
            {response == null ? (
                <form style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "99%" }}>
                    <TextField
                        value={inputName}
                        onChange={(eve) => {
                            setInputName(eve.currentTarget.value)
                        }}
                        label={"enter the name of member"}
                    />
                    <TextField
                        type="number"
                        value={inputAge}
                        onChange={(eve) => {
                            setInputAge(eve.currentTarget.value)
                        }}
                        label={"enter the age of member"}
                    />
                    <TextField

                        type="number"
                        value={inputNumber}
                        onChange={(eve) => {
                            setInputNumber(eve.currentTarget.value)
                        }}
                        label={"enter the phone number"}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={gender}
                        onChange={(eve, newvalue) => {
                            setInputGender(newvalue)
                        }}
                        getOptionLabel={(option) => option}
                        width={100}
                        sx={{ width: "100%" }}
                        renderInput={(params) => <TextField sx={{ width: "30%" }} {...params} label="gender" />}
                    />
                    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <Typography>
                            enter the profile image
                        </Typography>
                        <ImageList
                            cols={1}
                            sx={{ width: "20%", Height: "40%" }}
                        >
                            <ImageListItem>
                                <img

                                    srcSet={`${image}`}
                                >
                                </img>
                            </ImageListItem>
                        </ImageList>

                        <TextField
                            type="file"
                            accept="image/*"
                            onChange={(eve) => {
                                setInputImage(eve.currentTarget.files[0])
                            }}
                            variant="outlined"
                            sx={{
                                '& .MuiInputBase-root': {
                                    // Style the input field here
                                    backgroundColor: 'white',
                                    borderRadius: '4px',
                                    padding: '10px',
                                },
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography>
                            enter the proof 1
                        </Typography>
                        <TextField
                            type="file"
                            accept=".pdf"
                            onChange={(eve) => {
                                setInputProof1(eve.currentTarget.files[0])
                            }}
                            variant="outlined"
                            sx={{
                                '& .MuiInputBase-root': {
                                    // Style the input field here
                                    backgroundColor: 'white',
                                    borderRadius: '4px',
                                    padding: '10px',
                                },
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography>
                            enter the proof 2
                        </Typography>
                        <TextField
                            type="file"
                            accept=".pdf"
                            onChange={(eve) => {
                                setInputProof2(eve.currentTarget.files[0])
                            }}
                            variant="outlined"
                            sx={{
                                '& .MuiInputBase-root': {
                                    // Style the input field here
                                    backgroundColor: 'white',
                                    borderRadius: '4px',
                                    padding: '10px',
                                },
                            }}
                        />
                    </Box>
                    <Button
                        variant="outlined"
                        onClick={(eve) => {
                            const form = new FormData()
                            form.append('name', inputName);
                            form.append('age', inputAge);
                            form.append('phone', inputNumber)
                            form.append('gender', inputGender);
                            form.append('image', inputImage);
                            form.append('proof1', inputProof1)
                            form.append('proof2', inputProof2)
                            console.log(localStorage.getItem('login'))
                            form.append('userid', JSON.parse(localStorage.getItem('login')).userid)
                            console.log(form.get('image'))
                            axios.post('http://localhost:3000/addMember', form, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            }).then((res) => {
                                console.log(res.data)
                                setResponse(res.data)
                            }).catch((err) => {
                                console.error(err)
                                setResponse("Member already added..")
                            })
                        }}
                    >submit</Button>
                </form>
            ) : (<Paper sx={{width:"30%",bgcolor:"#ff3"}}
            >
                <Typography>
                    {success==undefined||success.inserId==null?success:"Added Successfully"}
                </Typography>
            </Paper>)}
           
        </Box>
    )
}