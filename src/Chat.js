import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Moment from "moment";
import styled from "@emotion/styled";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { v4 } from "uuid";
import ScrollToBottom from "react-scroll-to-bottom";

import {
  sendMessage,
  getRoomUserID,
  getMessage,
  sendImage,
  getImage,
} from "./Firebase";

const Scroll = styled(ScrollToBottom)`
  height: 443px;
  overflow-y: scroll;
`;

const DateMessage = styled.span`
  font-size: 13px;
`;

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
  width: "60%",
  right: "5%",
  float: "right",
};

const styleRight = {
  position: "relative",
  background: "lightblue",
  borderRadius: ".4em",
  marginTop: "5px",
  maxWidth: "60%",
  left: "5%",
};

const Input = styled("input")({
  display: "none",
});

const Chat = ({ clickUser }) => {
  const [textChat, setTextChat] = useState("");
  const [roomid, setRoomid] = useState("");
  const [message, setMessage] = useState([]);
  const [image, setImage] = useState([]); //save id and link image
  const [imageSend, setImageSend] = useState([]);

  const nickname = localStorage.getItem("nickname");

  const [allRoomChat, setAllRoomChat] = useState("");

  //get room id
  useEffect(() => {
    getRoomUserID(setAllRoomChat);
  }, [setAllRoomChat]);

  //get message for this chat
  useEffect(() => {
    setMessage([]);
    getMessage(roomid, setMessage);
  }, [roomid]);

  //get all link image of this message to show
  useEffect(() => {
    if (message) {
      const mess = message.filter((mess) => mess[1].type === "image"); //get chat image
      const messMap = mess.map((chat) => chat[1].content); //get id image
      if (messMap) {
        getImage(messMap, setImage);
      }
    }
  }, [message, imageSend]);

  //input text chat
  const onTextInputChange = (e) => {
    setTextChat((prev) => e.target.value);
  };

  //get room id
  useEffect(() => {
    let rooms = [];

    if (allRoomChat) {
      const roomNicknameChat = allRoomChat.filter(
        (room) => room[1].nickname === nickname
      );

      for (const roomNickname of roomNicknameChat) {
        rooms = [...rooms, roomNickname[1].roomid];
      }
      const roomClickUserChat = allRoomChat.filter(
        (room) => room[1].nickname === clickUser
      );

      for (const roomClickUser of roomClickUserChat) {
        rooms = [...rooms, roomClickUser[1].roomid];
      }

      for (let i = 0; i < rooms.length - 1; i++) {
        for (let j = i + 1; j < rooms.length; j++) {
          if (rooms[i] === rooms[j]) {
            setRoomid(rooms[i]);
            break;
          }
        }
      }
    }
  }, [allRoomChat, clickUser, nickname, setRoomid]);

  //click send message
  //send the time right at the moment, room id, sender, message
  const onSendBtnClick = () => {
    const moment = Moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
    const send = {
      roomid: roomid,
      date: moment,
      sender: nickname,
      content: textChat,
      type: "message",
    };
    sendMessage(send);
    setTextChat("");
  };

  //click send image
  const onSendImageBtnClick = (e) => {
    setImageSend(e);
    const moment = Moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
    const id = v4();
    sendImage(e.target.files[0], id);

    const send = {
      roomid: roomid,
      date: moment,
      sender: nickname,
      content: id,
      type: "image",
    };
    sendMessage(send);
    setImageSend(""); //đảm bảo việc gửi liên tiếp 1 ảnh không bị fail do ko onChange
  };

  //message, image,...
  const contentShow = (chat) => {
    if (chat[1].type === "message") {
      return <div style={{ marginTop: "5px" }}>{chat[1].content}</div>;
    } else {
      if (chat[1].type === "image") {
        const id = chat[1].content;
        const link = image.filter((img) => img[0] === id);
        if (link.length !== 0) {
          return (
            <div style={{ marginTop: "5px" }}>
              <img
                alt="send"
                src={link[0][1]}
                style={{
                  borderRadius: "8px",
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </div>
          );
        }
        return <></>;
      }
    }
  };

  //sender, time sender,...
  const showMessage = () => {
    return message.map((chat) => {
      return (
        <Card key={chat[1].date} sx={{ minWidth: 275, borderRadius: "0px" }}>
          <CardContent
            style={chat[1].sender === nickname ? styleLeft : styleRight}
          >
            {chat[1].sender === nickname ? (
              <Sender>Me</Sender>
            ) : (
              <Sender>{chat[1].sender}</Sender>
            )}
            <DateMessage> at {chat[1].date}</DateMessage>

            {contentShow(chat)}
          </CardContent>
        </Card>
      );
    });
  };
  return (
    <Grid item xs={12} md={12} style={{ height: "100%", width: "100%" }}>
      <div style={{ width: "100%", height: "443px", borderRadius: "10px" }}>
        {clickUser ? (
          
          <Scroll>{showMessage()}</Scroll>
        ) : (
          <CircularProgress
            style={{
              left: "50%",
              right: "50%",
              position: "absolute",
              top: "50vh",
            }}
          />
        )}
      </div>

      <TextField
        type="text"
        fullWidth
        InputProps={{
          startAdornment: (
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={onSendImageBtnClick}
                value={imageSend}
                disabled={!clickUser}
              />
              <IconButton
                color="primary"
                component="span"
                disabled={!clickUser}
              >
                <PhotoCamera />
              </IconButton>
            </label>
          ),
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
