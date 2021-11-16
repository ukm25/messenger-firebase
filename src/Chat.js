import React, { useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Moment from "moment";

import { sendMessage, getRoomUserID, getMessage } from "./Firebase";

const Chat = ({ clickUser }) => {
  const [textChat, setTextChat] = useState("");
  const [roomid, setRoomid] = useState("");
  const [allMessage, setAllMessage] = useState();
  const [chatMessage, setChatMessage] = useState();

  const nickname = localStorage.getItem("nickname");

  const [allRoomChat, setAllRoomChat] = useState("");

  useEffect(() => {
    getRoomUserID(setAllRoomChat);
  }, [setAllRoomChat]);

  // useEffect(() => {
  //   //get all message
  //   getMessage(roomid, setAllMessage);
  // }, [setAllMessage, roomid]);

  // useEffect(() => {
  //   //filter this chat message

  //   let chatMessages = [];
  //   if (allMessage && roomid) {
  //     console.log("@@")
  //     for (let i = 0; i < allMessage.length; i++) {
  //       if (allMessage[1].roomid === roomid) {
  //         chatMessages = [...chatMessages, allMessage[1]];
  //       }
  //     }
  //   }

  //   setChatMessage(chatMessages);
  // }, [allMessage, roomid]);

  const onTextInputChange = (e) => {
    setTextChat((prev) => e.target.value);
  };

  useEffect(() => {
    //load roomid
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
      // console.log("a", rooms.filter((item, index) => rooms.indexOf(item) !== index))
      // setRoomid(rooms.filter((item, index) => rooms.indexOf(item) !== index));
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

  const showMessage = () => {
    // chatMessage.map((chat) => {
    //   return (
    //     <Card sx={{ minWidth: 275 }}>
    //       <CardContent>
    //         <Typography variant="h5" component="div">
    //           Word of the Day
    //         </Typography>
    //       </CardContent>
    //     </Card>
    //   );
    // });
  };

  return (
    <Grid item xs={12} md={12} style={{ height: "100%", width: "100%" }}>
      <div style={{ width: "100%", height: "443px", borderRadius: "10px" }}>
      <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Word of the Day
              </Typography>
            </CardContent>
          </Card>
        {/* { chatMessage ? chatMessage.map((chat) => {
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Word of the Day
              </Typography>
            </CardContent>
          </Card>;
        }) : <></>} */}
        {showMessage()}
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
        placeholder="Nhập tin nhắn..."
        onChange={onTextInputChange}
        value={textChat}
      />
    </Grid>
  );
};

export default Chat;
