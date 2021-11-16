import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import User from "./User";

import { getListUser } from "./Firebase";

const style = {
  width: "100%",
  maxWidth: 360,
};

const ListUser = ({ setClickUser }) => {
  const [users, setUsers] = useState();
  const [nickname, setNickName] = useState("");
  const history = useHistory();
  
  useEffect(() => {
    setNickName(localStorage.getItem("nickname"));
  }, []);
  const onLogoutBtnClick = () => {
    localStorage.removeItem("nickname");
    history.push("/login");
  };

  useEffect(() => {
    getListUser(setUsers);
  }, [setUsers]);

  const renderUsers = (users) => {
    if (users) {
      const usersMap = users.filter((user) => {
        return (
          localStorage.getItem("nickname") !== Object.entries(user[1])[0][1]
        );
      });
      return usersMap.map((user) => (
        <User key={user[0]} user={Object.entries(user[1])[0][1]} setClickUser={setClickUser} />
      ));
    } else {
      return <></>;
    }
  };

  return (
    <>
      <Typography variant="h5" gutterBottom style={{ paddingLeft: "16px", }}>
          {nickname}
          <Button variant="contained" onClick={onLogoutBtnClick}>
            Logout
          </Button>
        </Typography>
      <List sx={style} component="nav" aria-label="mailbox folders">
        {renderUsers(users)}
      </List>
    </>
  );
};

export default ListUser;
