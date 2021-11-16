import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import { checkLogin } from "./Firebase";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [textInput, setTextInput] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const onAddBtnClick = () => {
    setShowLoading(true);
    checkLogin(history, textInput, setShowLoading);
  };

  const onTextInputChange = (e) => {
    setTextInput((prev) => e.target.value);
  };
  return (
    <>
      {showLoading ? (
        <CircularProgress
          style={{
            left: "50%",
            right: "50%",
            position: "absolute",
            top: "50vh",
          }}
        />
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <Grid item xs={9} md={5} sm={6} lg={4}>
            <Typography
              variant="h5"
              gutterBottom
              style={{ textAlign: "left", width: "100%" }}
            >
              LOGIN
            </Typography>
            <TextField
              type="text"
              fullWidth
              InputProps={{
                endAdornment: (
                  <Stack spacing={2} direction="row">
                    <Button
                      variant="contained"
                      onClick={onAddBtnClick}
                      disabled={!textInput}
                    >
                      Login
                    </Button>
                  </Stack>
                ),
              }}
              placeholder="Nhập tên của bạn..."
              onChange={onTextInputChange}
              value={textInput}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Login;
