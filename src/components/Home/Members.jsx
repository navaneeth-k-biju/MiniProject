import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box, IconButton } from '@mui/material';
import { MoreVertOutlined } from '@mui/icons-material';

export default function AlignItemsList() {
    return (
        <List sx={{ width: '100%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Albin" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    aria-label='name'
                    primary="Albin"
                    secondary={
                        <React.Fragment>
                            <Box sx={{ display: "flex", flexDirection: "ro" }}>
                                <Box>
                                    <Typography
                                        sx={{ display: 'block' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        gender: male
                                    </Typography>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        age: 24
                                    </Typography>
                                    <Typography
                                        sx={{ display: 'block' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        phone number: 9010456740
                                    </Typography>
                                </Box>
                                <Box sx={{display:"flex", width:"100%",flexDirection:"row"}}>
                                    <IconButton>
                                        <MoreVertOutlined/>
                                    </IconButton>
                                </Box>
                            </Box>

                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Navaneeth" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    aria-label='name'
                    primary="Navaneeth"
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'block' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                gender: male
                            </Typography>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                age: 21
                            </Typography>
                            <Typography
                                sx={{ display: 'block' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                phone number: 9010456740
                            </Typography>
                        </React.Fragment>

                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Sabari" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    aria-label='name'
                    primary="Sabari"
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'block' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                gender: male
                            </Typography>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                age: 21
                            </Typography>
                            <Typography
                                sx={{ display: 'block' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                phone number: 9010456740
                            </Typography>
                        </React.Fragment>

                    }
                />
            </ListItem>
        </List>
    );
}