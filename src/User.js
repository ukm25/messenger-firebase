import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const User = ({ user, setClickUser, clickUser }) => {
    return (
        <ListItem button divider style={clickUser === user ? {backgroundColor:"#dcf8c6"} : {backgroundColor:"white"}} key={user[0]} user={Object.entries(user[1])[0][1]}>
          <ListItemText  primary={ user } onClick={() => setClickUser(user)} />
        </ListItem>
    );
};

export default User;