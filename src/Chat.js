import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Moment from "moment";
import styled from "@emotion/styled";

import { sendMessage, getRoomUserID, getMessage } from "./Firebase";

const Scroll = styled.div`
  height: 443px;
  overflow-y: scroll;
`;

const DateMessage = styled.span`
font-size:13px`;

const Sender = styled.span`
font-size: 17px;
  font-weight: bold;
  color: green;
`;

const styleLeft = {
  position: "relative",
  background: "#dcf8c6",
  borderRadius: ".4em",
  marginTop: "5px",
  width:"60%",
  right: "5%",
  float:"right",
};

const styleRight = {
  position: "relative",
  background: "lightblue",
  borderRadius: ".4em",
  marginTop: "5px",
  maxWidth:"60%",
  left: "5%",
};
const Chat = ({ clickUser }) => {
  const [textChat, setTextChat] = useState("");
  const [roomid, setRoomid] = useState("");
  const [message, setMessage] = useState([]);

  const nickname = localStorage.getItem("nickname");

  const [allRoomChat, setAllRoomChat] = useState("");

  useEffect(() => {
    if(clickUser) {
      getRoomUserID(setAllRoomChat);
    }
  }, [setAllRoomChat, clickUser]);

  useEffect(() => {
    getMessage(roomid, setMessage);
  }, [roomid]);

  const onTextInputChange = (e) => {
    setTextChat((prev) => e.target.value);
  };

  useEffect(() => {
    let rooms = [];

    if (allRoomChat) {
      const roomNicknameChat = allRoomChat.filter(
        (room) => room[1].nickname === nickname
      );
      for (let i = 0; i < roomNicknameChat.length; i++) {
        rooms = [...rooms, roomNicknameChat[i][1].roomid];
      }
      const roomClickUserChat = allRoomChat.filter(
        (room) => room[1].nickname === clickUser
      );

      for (let i = 0; i < roomClickUserChat.length; i++) {
        rooms = [...rooms, roomClickUserChat[i][1].roomid];
      }

      for (let i = 0; i < rooms.length - 1; i++) {
        for (let j = i + 1; j < rooms.length; j++) {
          if (rooms[i] === rooms[j]) {
            setRoomid(rooms[i]);
          }
        }
      }
    }
  }, [allRoomChat, clickUser, nickname, setRoomid]);

  const onSendBtnClick = () => {
    const moment = Moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
    const send = {
      roomid: roomid,
      date: moment,
      sender: nickname,
      message: textChat,
    };
    sendMessage(send);
    setTextChat("");
  };

  return (
    <Grid item xs={12} md={12} style={{ height: "100%", width: "100%" }}>
      <div style={{ width: "100%", height: "443px", borderRadius: "10px" }}>
        <Scroll>
          {message.map((chat) => {
            return (
              <Card key={chat[1].date} sx={{ minWidth: 275, borderRadius:"0px" }}>
                <CardContent style={chat[1].sender === nickname ? styleLeft : styleRight}>
                  
                  {chat[1].sender === nickname ? (
                    <Sender>Me</Sender>
                  ) : (
                    <Sender>{chat[1].sender}</Sender>
                  )}
                  <DateMessage> at {chat[1].date}</DateMessage>
                  <div style={{ marginTop:"5px"}}>
                    {chat[1].message}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </Scroll>
      </div>
      <TextField
        type="text"
        fullWidth
        InputProps={{
          endAdornment: (
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                onClick={onSendBtnClick}
                disabled={!textChat}
              >
                Send
              </Button>
            </Stack>
          ),
        }}
        disabled={!clickUser}
        placeholder="Nhập tin nhắn..."
        onChange={onTextInputChange}
        value={textChat}
      />
    </Grid>
  );
};

export default Chat;
