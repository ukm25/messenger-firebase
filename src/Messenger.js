import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import ListUser from "./ListUser";
import Chat from "./Chat";

const RoomList = () => {
  const [clickUser, setClickUser] = useState("");

  return (
    <Grid
      container
      spacing={2}
      xs={12}
      md={12}
      sm={9}
      lg={8}
      style={{
        border: "1px ridge",
        margin: "0px",
        width: "100%",
        height: "500px",
        borderRadius: "10px",
      }}
    >
      <Grid
        item
        xs={3}
        md={3}
        style={{
          borderRight: "1px ridge",
          paddingLeft: "0px",
        }}
      >
        <ListUser setClickUser={setClickUser}/>
      </Grid>
      <Grid
        item
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
