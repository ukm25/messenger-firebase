import React, { useState } from "react";
import Grid from "@mui/material/Grid";

import ListUser from "./ListUser";
import Chat from "./Chat";

const RoomList = () => {
  const [clickUser, setClickUser] = useState("");

  return (
    <Grid
      container
      spacing={2}
      style={{
        border: "1px ridge",
        margin: "0px",
        width: "70%",
        height: "500px",
        borderRadius: "10px",
      }}
    >
      <Grid
        item={true}
        xs={3}
        md={3}
        style={{
          borderRight: "1px ridge",
          paddingLeft: "0px",
        }}
      >
        <ListUser clickUser={clickUser} setClickUser={setClickUser}/>
      </Grid>
      <Grid
        item={true}
        xs={9}
        md={9}
        style={{ padding: "0px", height: "100%", width: "100%" }}
      >
        <Chat clickUser={clickUser}/>
      </Grid>
    </Grid>
  );
};

export { RoomList };
