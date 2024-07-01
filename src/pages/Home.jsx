import { Avatar, Button, CardHeader, Grid, IconButton, List, ListItem, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import signature from '../assets/img/fake-autograph-samples-handdrawn-signatures-260nw-2325821623.webp'
import '../pages/Home.css'
import { Card, CardContent, CardMedia } from '@mui/material';
import image from '../assets/img/QT-ration-cards.jpg'
import axios from "axios";
import image2 from '../assets/img/rural-women-distributing-grains-and-managing-subsides-ration-shop-ET1ABA.jpg'
import { Add, Delete, Edit, PortableWifiOffOutlined, ViewArraySharp, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { DeleteModal } from "../components/Home/DeleteModal";
import { Link } from "react-router-dom";


const Home = ({ setIsLogin }) => {
    console.log("home is rendering")
    const navigate = useNavigate()
    const [del, setDelete] = useState(false)
    const [response, setResponse] = useState([])
    const [Item, setItem] = useState()
    const url = "http://localhost:3000"
    const homeServer = (cred) => {
        setTimeout(() => {
            if (localStorage.getItem('login') != null) {
                var form = new FormData()
                form.append('id', JSON.parse(localStorage.getItem('login')).userid)
                console.log(form)
                axios.post(url + "/home", form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                    setResponse(res.data)
                    console.log(res.data)
                }).catch((err) => {
                    console.log(err)
                })
            }
        }, 500)

    }
    useEffect(() => {
        homeServer()
        console.log("home ")
    }, [])
    const [list, setList] = useState([])
    const [uilist, setUilist] = useState([])
    useEffect(() => {
        console.log(response.home)
        if (typeof (response) != "string") {
            response.map((item, index) => {
                if (item.image != null) {
                    console.log(item)
                    console.log("http://localhost:3000/", item.image.toString())
                }
                setUilist((prev) => [...prev, (
                    <TableRow sx={{ width: "100%" }}>
                        <TableCell>
                            <Avatar
                                src={"http://localhost:3000/" + item.image}
                            />
                        </TableCell>
                        <TableCell>
                            {item.mname}
                        </TableCell>
                        <TableCell>
                            {item.age}
                        </TableCell>
                        <TableCell>
                            {item.gender}
                        </TableCell>
                        <TableCell>
                            {item.phone}
                        </TableCell>
                        <TableCell>
                            <Link to={"http://localhost:3000/" + item.proof1}>proof1</Link>
                        </TableCell>
                        <TableCell>
                            <Link to={"http://localhost:3000/" + item.proof2}>proof2</Link>
                        </TableCell>
                        <TableCell>
                            <IconButton>
                                <Visibility />
                            </IconButton>
                        </TableCell>
                        <TableCell
                            onClick={(eve) => {
                                setItem(item)
                                setDelete(!del)
                            }}
                        >
                            <IconButton>
                                <Delete />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                )
                ])
            })
        }
    }, [response])

    return (
        response.length > 0 ? (
            <Box sx={{ background: `url(${image})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", flexGrow: 1, width: "100%", height: "100%" }}>
                <Grid container spacing={0} sx={{ height: "100%" }}>
                    <Grid item xs={12} sx={{ bgcolor: "white", margin: 0 }}>
                        <Box sx={{ padding: 0, margin: 0 }}>
                            <Typography variant="h5" sx={{ color: "black", padding: "0px", margin: "0px", background: "white" }}>
                                Head details
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid sx={{ overflow: "hidden" }} item xs={4}>
                        <Card sx={{
                            boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                            maxWidth: 300,
                            marginLeft: "10px",
                            marginTop: "5px",
                            background: "lightgray",
                            height: "95%",
                            marginBottom: "5px"
                        }}>
                            <CardMedia
                                component="img"
                                image={"http://localhost:3000/" + JSON.parse(localStorage.getItem('login')).image}
                                alt={"Varun"}
                            />
                            <CardContent>
                                photo
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid sx={{ overflow: "hidden", padding: 0, margin: 0 }} item xs={4}>
                        <Card sx={{
                            boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                            maxWidth: 345,
                            marginTop: "5px",
                            background: "lightgray",
                            height: "95%",
                            marginBottom: "5px"
                        }}>
                            <CardMedia
                                component="img"
                                image={"http://localhost:3000/" + JSON.parse(localStorage.getItem('login')).signature}
                                alt={"Varun"}
                            />
                            <CardContent>
                                signature
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid sx={{ overflow: "hidden", padding: 0, margin: 0 }} item xs={4}>
                        <Card sx={{
                            boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                            maxWidth: 345,
                            marginTop: "5px",
                            background: "lightgray",
                            height: "95%",
                            marginBottom: "5px"
                        }}>
                            <CardHeader
                                title="details"
                            >
                            </CardHeader>
                            <CardContent>
                                <List>
                                    <ListItem>
                                        {<strong>Age</strong>}: 21
                                    </ListItem>
                                    <ListItem>
                                        {<strong>Name</strong>}: {JSON.parse(localStorage.getItem('login')).name}
                                    </ListItem>
                                    <ListItem>
                                        {<strong>ration</strong>}: {JSON.parse(localStorage.getItem('login')).rationcardno}
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sx={{ bgcolor: "white", margin: 0, padding: 0 }}>
                        <Box>
                            <Typography variant="h5">
                                Member details
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 0, margin: 0 }} item xs={12}>
                        <Box sx={{
                            boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
                            background: "lightgray",
                            width: "100%",
                            height: "100%",
                            padding: 0,
                            margin: 0
                        }}>
                            <TableContainer>
                                <Table sx={{ width: "100%" }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <Typography variant="h5">
                                                    image
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h6">
                                                    name
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h6">
                                                    age
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h6">
                                                    gender
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h6">
                                                    phone
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h6">
                                                    proof1
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h6">
                                                    edit
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h6">
                                                    view
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h6">
                                                    delete
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {uilist}
                                    <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                        <Typography sx={{ padding: 2 }}>
                                            Add Member
                                        </Typography>
                                        <IconButton
                                            onClick={(eve) => {
                                                navigate('/addMember')
                                            }}
                                            sx={{ bgcolor: "white" }}>
                                            <Add />
                                        </IconButton>
                                    </Box>


                                </Table>
                            </TableContainer>

                        </Box>
                    </Grid>
                </Grid>
                <DeleteModal open={del} setOpen={setDelete} item={Item} />
            </Box>
        ) : (
            <Box sx={{ width: "100%", height: '100%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: `url(${image2})` }}>
                <Paper sx={{ width: "fit-content", margin: 1, bgcolor: "#ff3", padding: 1, minHeight: "50%", minWidth: "50%", borderRadius: "10px", display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center" }}>
                    <Typography variant="h5">
                        You did'nt have set up your profile and added members
                    </Typography>
                    <Avatar
                        sx={{ width: "100px", height: "100px", margin: 5 }}
                        src={<PortableWifiOffOutlined />}

                    >

                    </Avatar>
                    <Button
                        variant="outlined"
                        onClick={(eve) => {
                            navigate('/profile')
                        }}
                    >profile</Button>
                </Paper>

            </Box>
        )
    )
}
export default Home;