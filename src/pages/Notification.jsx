import { Paper, Typography } from "@mui/material";
import React, { useState,useEffect } from "react";
import { Box } from "@mui/material";
export const Notification = () => {
    const [reponse, setResponse] = useState()
    const [datalist,setDatalist] = useState([])
    const head = JSON.parse(localStorage.getItem('login'))
    const [view,setView]=useState([])
    const formData = new FormData()
    formData.append('id', head.cardtype)
    console.log(formData.get('id'))
    useEffect(() => {
        console.log("fetching data");
        fetch('http://localhost:3000/notification', {
            method: "POST",
            body: formData
        }).then((res) => {
            // Check if the response is successful
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the response body
            return res.json(); // or res.text(), depending on the response type
        }).then((data) => {
            console.log(data)
            setDatalist(data);
        }).catch((err) => {
            console.error('Fetch error:', err);
        }); 
    }, []);
    useEffect(()=>{
        console.log(datalist,"datalist")
    },[datalist])
    return (
        <Box
            sx={{
                display:"flex",
                justifyContent:"center",
                flexDirection:"column",
                alignItems:"center",
                margin:1
            }}
        >
            {datalist.map((item, index) => (
                <Paper 
                sx={{
                    width:"90%"
                }}
                key={"paper" + index}>
                    <Typography
                        sx={{
                            width:'90%',
                            borderRadius:'20px'
                        }}
                     variant="h3">
                        {item.title}
                    </Typography>
                    <Typography>
                        {item.description}
                    </Typography>
                </Paper>
            ))}
        </Box>
    );
    
}