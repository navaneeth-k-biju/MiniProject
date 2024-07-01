import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';

const style = {
    py: 0,
    width: '100%',
    maxWidth: 360,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
    height: "100%"
};

export default function DividerVariants() {
    const head=JSON.parse(localStorage.getItem('login'))
    console.log(head)
    return (
        <List sx={style}>
            <ListItem>
                <ListItemText primary="Owner Details" />
            </ListItem>
            <Divider component="li" />
            <ListItem>
                <ListItemText primary="Name :" />
                <Typography
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    {head.name}
                </Typography>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemText primary="Ration Card number :" />
                <Typography
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    {head.rationcardno}
                </Typography>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemText variant="inset" primary="phone number :" />
                <Typography
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    {head.phone}
                </Typography>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemText primary="card type :" />
                <Typography
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    {head.cardtype}
                </Typography>
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    );
}