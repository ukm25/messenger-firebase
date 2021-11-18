import firebase from "firebase";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyDx2ELH4wh5WfSxz2ogzWAphhPo5ucGCM4",
  authDomain: "chatapp-58ed1.firebaseapp.com",
  databaseURL: "https://chatapp-58ed1-default-rtdb.firebaseio.com",
  projectId: "chatapp-58ed1",
  storageBucket: "chatapp-58ed1.appspot.com",
  messagingSenderId: "153964498721",
  appId: "1:153964498721:web:7300979d4b573bfb18b860",
  measurementId: "G-KNB94KJRYC",
};

firebase.initializeApp(firebaseConfig);

//login or register
const checkLogin = (history, textInput, setShowLoading) => {
  const ref = firebase.database().ref();
  ref
    .child("users")
    .orderByChild("nickname")
    .equalTo(textInput)
    .once("value", (snapshot) => {
      if (!snapshot.exists()) {
        //if account not exist, register new account
        createRoomChat(textInput);
        const newUser = firebase.database().ref("users/").push();
        newUser.set({ nickname: textInput });
      }
      localStorage.setItem("nickname", textInput);
      history.push("./message");
      setShowLoading(false);
    });
};

//get all account
const getListUser = (setUsers) => {
  const ref = firebase.database().ref();
  ref
    .child("users")
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        setUsers(Object.entries(snapshot.val()));
      }
    });
};

//get all account
const createRoomChat = (textInput) => {
  const ref = firebase.database().ref();
  ref
    .child("users")
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        Object.entries(snapshot.val()).map((snap) => {
          return createRoomUsers(textInput, snap[1].nickname, createRoom());
        });
      }
    });
};

const createRoom = () => {
  const newRoom = firebase.database().ref("rooms/").push();
  const roomID = v4();
  newRoom.set({ id: roomID });
  return roomID;
};

const createRoomUsers = (userFirst, userSecond, id) => {
  const newUserFirst = firebase.database().ref("roomUsers/").push();
  newUserFirst.set({ nickname: userFirst, roomid: id });
  const newUserSecond = firebase.database().ref("roomUsers/").push();
  newUserSecond.set({ nickname: userSecond, roomid: id });
};

const getRoomUserID = (setAllRoomChat) => {
  const ref = firebase.database().ref();
  ref
    .child("roomUsers")
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        setAllRoomChat(Object.entries(snapshot.val()));
      }
    });
};

const sendMessage = (chat) => {
  const newMessage = firebase.database().ref("chats/").push();
  newMessage.set(chat);
};

const getMessage = async (roomid, setMessage) => {
  const ref = firebase.database().ref();
  ref
    .child("chats")
    .orderByChild("roomid")
    .equalTo(roomid)
    .on("value", (snapshot) => {
      if(snapshot.exists()) {
        setMessage([]);
        setMessage(Object.entries(snapshot.val()));
      }
      
    });
};

export {
  firebase,
  checkLogin,
  getListUser,
  sendMessage,
  getRoomUserID,
  getMessage,
};
