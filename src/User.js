import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const User = ({ user, setClickUser }) => {
    return (
        <ListItem button divider>
          <ListItemText primary={ user } onClick={() => setClickUser(user)} />
        </ListItem>
    );
};

export default User;