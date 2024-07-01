import React, { useEffect, useState } from "react";
import { Box,Typography } from "@mui/material";
import { PieChart }  from "@mui/x-charts/PieChart";    
export const PieCharter = () => {
    const head=JSON.parse(localStorage.getItem('login'))
    const [response,setResponse]=useState([
        { id: 0, value: 10, label: 'wheat ' },
        { id: 1, value: 35, label: 'rice ' },
        { id: 2, value: 20, label: 'kerosene ' },
    ])
    const formData=new FormData()
    formData.append('id',head.cardtype)
    useEffect(()=>{
        console.log("fetching data")
        fetch('http://localhost:3000/rationData', {
            method: "POST",
            body: formData // formData should be the actual data you want to send
        }).then((res) => {
            // Check if the response is successful
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the response body
            return res.json(); // or res.text(), depending on the response type
        }).then((data) => {
            let refined=[]
            console.log(data); 
            data.map((item,index)=>{
                refined.push({
                    id:index,
                    value:item.iquantity,
                    label:item.name
                })
            })
            console.log(refined)
            setResponse(refined)
            
        }).catch((err) => {
            console.error('Fetch error:', err);
        });
    },[])
    return (
        <Box width={"95%"} height={"95%"} sx={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <Typography variant="h5" margin={"10px"}>
                Ration Available for your Card      
            </Typography>
            <PieChart
                series={
                    [
                        {
                            data:response
                        }
                    ]
                }
                width={400}
                height={200}
            />
        </Box>
    )
}