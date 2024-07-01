import React, { useContext, useState } from 'react';
import { styled } from '@mui/material/styles'; // Import for styling
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Profile.css'
import { Add, Edit } from '@mui/icons-material';
import image1 from '../assets/img/135188-qkbxsgovsx-1584709357.jpg'
import BasicModal from '../components/profile/modal';
import { Link, useNavigate } from 'react-router-dom';
import axios, { Axios } from 'axios';
import SocketContext from '../components/socketClient';
import { Box, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
const CardContentWrapper = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const AvatarWrapper = styled(Avatar)({
    backgroundColor: 'primary.main',
    width: 150,
    height: 150,
    marginBottom: 10,
});

const EditButtonWrapper = styled(IconButton)({
    float: 'right',
});

const TextFieldWrapper = styled(TextField)({
    marginBottom: 10,
});


const ProfilePage = () => {
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const loginData = JSON.parse(localStorage.getItem('login'))
    console.log(loginData)
    const [userData, setUserData] = useState({
        id: loginData.userid,
        name: loginData.name,
        email: loginData.email,
        bio: loginData.bio,
        phone: loginData.phone,
        image: loginData.image,
        signature: loginData.signature
    });
    const { response } = useContext(SocketContext)
    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    };
    const toggleEditMode = () => {
        setEditMode(!editMode);
    };
    const [image, setImage] = useState('http://localhost:3000/' + loginData.image)
    const [profile, setProfile] = useState('http://localhost:3000/' + loginData.signature)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalOpenSignature, setModalOpenSignature] = useState(false)
    const [error,setError]=useState('')
    const handleSignature = (eve) => {
        setProfile(URL.createObjectURL(eve.target.files[0]))
        setUserData({ ...userData, signature: eve.target.files[0] })
    }
    const handleImage = (eve) => {
        setImage(URL.createObjectURL(eve.target.files[0]))
        setUserData({ ...userData, image: eve.target.files[0] })
    }
    return (
        <Card width="90%">
            <BasicModal modalOpen={modalOpen} setModalOpen={setModalOpen} handleImage={handleImage} />
            <BasicModal modalOpen={modalOpenSignature} setModalOpen={setModalOpenSignature} handleImage={handleSignature} />
            <CardContentWrapper>
                <ImageList
                    sx={{
                        width: "40%"
                    }}
                >
                    <ImageListItem>
                        <img
                            style={{
                                borderRadius: "10px"
                            }}
                            loading='lazy'
                            src={image}
                        >
                        </img>
                        <ImageListItemBar
                            position='below'
                            title={"Profile "}
                            actionIcon={
                                <IconButton
                                    onClick={(eve) => {
                                        console.log("clicked")
                                        setModalOpen(!modalOpen)
                                    }}
                                >
                                    <Edit />
                                </IconButton>
                            }
                        >
                        </ImageListItemBar>
                    </ImageListItem>
                    <ImageListItem>
                        <img
                            style={{
                                borderRadius: "10px"
                            }}
                            loading='lazy'
                            src={profile}
                        >
                        </img>
                        <ImageListItemBar
                            actionIcon={
                                <IconButton
                                    onClick={(eve) => {
                                        console.log("clicked")
                                        setModalOpenSignature(!modalOpen)
                                    }}
                                >
                                    <Edit />
                                </IconButton>
                            }
                            position='below'
                            title={"signature"}
                        >
                        </ImageListItemBar>
                    </ImageListItem>
                </ImageList>


                <Typography variant="h5" component="div">
                    {userData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {userData.email}
                </Typography>
                <Typography variant="body1" component="p">
                    {userData.bio}
                </Typography>
                {editMode && (
                    <div className='profile'>
                        <TextFieldWrapper
                            label="Name"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                        />
                        <TextFieldWrapper
                            label="Email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                        />
                        <TextFieldWrapper
                            label="Bio"
                            name="bio"
                            multiline
                            rows={4}
                            value={userData.bio}
                            onChange={handleChange}
                        />
                        <TextFieldWrapper
                            label="phone"
                            name="phone"
                            type='number'
                            value={userData.phone}
                            onChange={handleChange}
                        />
                        <Typography variant='p' sx={{ color: "red" }}>{error}</Typography>
                        <Button variant="contained" color="primary" style={{ marginTop: 10 }}
                            onClick={(eve) => {
                                if(userData.phone.length!=10){
                                    setError('enter valid phone no ')
                                    return
                                }else{
                                    console.log(typeof(userData.phone))
                                }
                                console.log(userData)
                                const formData = new FormData();
                                formData.append('id', userData.id)
                                formData.append('name', userData.name);
                                formData.append('email', userData.email);
                                formData.append('bio', userData.bio);
                                formData.append('phone', userData.phone);
                                formData.append('image', typeof(userData.image)==="string"?loginData.image:userData.image);
                                formData.append('signature', typeof(userData.signature)==="string"?loginData.signature:userData.signature);
                                console.log(formData.get('signature'))
                                axios.post("http://localhost:3000/profile", formData, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data'
                                    }
                                }).then((res) => {
                                    console.log(res.data)
                                    if(res.status === 200){
                                        console.log("response is ok...")
                                        navigate("/home")
                                    }
                                }).catch((err) => {
                                    console.error(err)
                                })
                            }}
                        >
                            Save Changes
                        </Button>
                    </div>
                )}
                <EditButtonWrapper onClick={toggleEditMode}>
                    <EditIcon />
                </EditButtonWrapper>
            </CardContentWrapper>
            <Button><Link to={"/home"}>go to home</Link></Button>
        </Card>
    );
};

export default ProfilePage;
