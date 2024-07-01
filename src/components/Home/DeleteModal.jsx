import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
export const DeleteModal=({open,setOpen,item})=>{
    const [close,setClose]=useState(false)
    const [sucess,setSucess]=useState(' Applied for Deleting Member of your Ration Card ')
    console.log(item)
    return(<Modal
        open={open}
    >
        <Paper sx={{
            position:"absolute",
            top:"50%",
            transform: 'translate(-50%, -50%)',
            width:400,
            height:200,
            display:"flex",
            flexDirection:"column",
            left:"50%",
            justifyContent:"space-evenly",
            alignItems:"center"
        }}>
            <Typography>
               {sucess}
            </Typography>
            <Box
                sx={{
                    display:"flex",
                    flexDirection:"row",
                    width:"100%",
                    justifyContent:"space-evenly"
                }}
            >
                <Button
                    onClick={(eve)=>{
                        const form=new FormData()
                        form.append('id',item.id)
                        axios.post('http://localhost:3000/deleteMember',form,{
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then((res)=>{
                            console.log(res.data)
                            setSucess(res.data)
                        }).catch((err)=>{
                            console.error(err)
                        })
                    }}
                 variant="contained">
                    procceed
                </Button>
                <Button
                    onClick={(eve)=>{
                        setOpen(!open)
                    }}
                 variant="contained">
                    close
                </Button>
            </Box>
        </Paper>
    </Modal>)
}