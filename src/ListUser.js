import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

import User from "./User";

import { getListUser } from "./Firebase";

const style = {
  width: "100%",
  maxWidth: 360,
};

const Scroll = styled.div`
  height: 429px;
  overflow-y: scroll;
`;

const ListUser = ({ clickUser, setClickUser }) => {
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
        <User setClickUser={setClickUser} clickUser={clickUser} user={Object.entries(user[1])[0][1]}/>
      
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
        <Scroll>
        {renderUsers(users)}
        </Scroll>
        
      </List>
    </>
  );
};

export default ListUser;
