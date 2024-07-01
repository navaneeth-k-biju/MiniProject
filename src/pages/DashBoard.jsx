import { Box, Card, CardHeader, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PieCharter } from "../components/dashboard/PieChart";
import { createTheme } from "@mui/material/styles";
import BasicTable from "../components/dashboard/Table";
import DividerVariants from "../components/dashboard/UserDetails";



const DashBoard = () => {
   
    const theme = createTheme({
        palette: {
            primary: { main: '#007bff' }, 
            secondary: { main: '#ffc107' }, 
            tertiary: { main: '#28a745' }, 
        },
    });
    const [history, setHistory] = useState([(<div></div>)]);

    useEffect(() => {
        const historyData = [
            { no_of_quantity: 4, prize: 30, claimed_by: "Varun", claimed_on: "22/10/2023" },
            { no_of_quantity: 3, prize: 30, claimed_by: "Navaneeth", claimed_on: "07/9/2023" },
            { no_of_quantity: 4, prize: 30, claimed_by: "Sabari", claimed_on: "02/9/2023" },
            { no_of_quantity: 5, prize: 30, claimed_by: "Sidharthan", claimed_on: "20/08 /2023" },
        ];

        const mappedHistory = historyData.map((item) => (
            <Card key={item.claimed_by} sx={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px" }}>
                <CardHeader
                    title={<Typography variant="h5" sx={{ color: theme.palette.primary.main }}>{item.claimed_by}</Typography>}
                />
                <CardContent sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                    <Typography variant="body2" sx={{ color: theme.palette.secondary.main }}>Quantity: {item.no_of_quantity}</Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.tertiary.main }}>Prize: {item.prize}</Typography>
                    <Typography variant="body2">Claimed on: {item.claimed_on}</Typography>
                </CardContent>
            </Card>
        ));

        setHistory(mappedHistory);
    }, []);

    return (
        <Grid container spacing={3} width={"98%"} height={"100%"} sx={{ margin: "0px" }}>
            <Grid item xs={6} sm={6} md={5.4} height={"50%"} >  {/* Responsive column widths */}
                <PieCharter/>
            </Grid>
            <Grid item xs={4} sm={4} md={3} height={"50%"} >
                <Box width={"95%"} height={"95%"} sx={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px", borderRadius: "10px", display: "flex", justifyContent: "start", alignItems: "start", flexDirection: "column" }}>
                    <DividerVariants/>
                </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={3} height={"50%"}  >
                <Box width={"95%"} height={"95%"} sx={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                </Box>
            </Grid>
            <Grid item xs={6} sm={4} md={15} height={"50%"} width={"100%"}  >
                <Box width={"95%"} sx={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px", borderRadius: "10px", display: "flex", justifyContent: "start", alignItems: "center", flexDirection: "column" }}>
                    <Typography variant="h5" margin={"10px"}>
                        Ration History of your Account
                    </Typography>
                    <BasicTable />
                </Box>
            </Grid>
        </Grid>

    )
}
export default DashBoard;