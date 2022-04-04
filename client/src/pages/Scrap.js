import {
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { scrapMedia } from "../functions/scrap";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const socket = io.connect("http://localhost:8000");

const Scrap = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [connection, setConnection] = useState(false);
  const [urls, setUrls] = useState([""]);
  const [mediaUrl, setMediaUrl] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await scrapMedia(urls);
    if (result.status === 200) {
      let data = result.data.data;
      setUrls([""]);
      setMediaUrl(data);
      setTimeout(() => {
        scrapData(data, user.id);
      });
      setConnection(false);
    }
  };
  const handleUrlChange = (e, index) => {
    if (!connection) testConnection();
    let currentUrls = [...urls];
    currentUrls[index] = e.target.value;
    setUrls(currentUrls);
  };

  const addNewRow = () => {
    let lastItem = urls[urls.length - 1];
    if (lastItem) {
      let newUrl = [...urls, ""];
      setUrls(newUrl);
    }
  };

  const joinRoom = () => {
    if (user.id) {
      socket.emit("join", user.id);
    }
  };

  useEffect(() => {
    if (user && user.id && socket.connected) joinRoom();
  }, [user]);

  //Scrap emitter function
  const scrapData = (data, user) => {
    socket.emit("scrap", { data, user });
  };

  //Test connection
  const testData = () => {
    socket.emit("test", user.id);
  };

  //Socket catch fxn for each url scrap completion
  const completedScraping = (data) => {
    if (mediaUrl.length == 0) return;
    let resultSet = [...mediaUrl];
    let itemIndex = resultSet.findIndex((item) => item.id == data.id);
    if (itemIndex >= 0) {
      resultSet[itemIndex] = data;
      setMediaUrl(resultSet);
    }
  };

  const checkScrapProcessStatus = () => {
    if (mediaUrl.length === 0) return false;
    if (mediaUrl.filter((item) => item.status == 0).length === 0) return true;
    return false;
  };

  const testConnection = (data) => {
    setConnection(true);
  };

  const emitFunction = () => {
    socket.on("completed", completedScraping);
    socket.on("test", testConnection);
    socket.on("jointed", testConnection);
  };

  useEffect(() => {
    emitFunction();
  }, [socket, mediaUrl]);

  return (
    <Container sx={{ mt: 8, height: "90vh" }}>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {urls.map((url, index) => (
          <Box key={index}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="url"
              label="Website Address"
              name="url"
              onChange={(e) => handleUrlChange(e, index)}
              value={url}
              autoFocus
            />
          </Box>
        ))}

        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <IconButton size="large" onClick={addNewRow}>
            <AddCircleIcon size="40" />
          </IconButton>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={!connection}
        >
          Scrap Image & Videos
        </Button>
      </Box>
      {!checkScrapProcessStatus() && !connection && mediaUrl.length ? (
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography gutterBottom variant="body1">
            Please don't reload or goto another page while scrapping is in
            progress.
          </Typography>
        </Box>
      ) : (
        ""
      )}
      <Box>
        <List>
          {mediaUrl.map((item) => (
            <div key={item.id}>
              <ListItem>
                <ListItemText
                  primary={item.url}
                  secondary={
                    item.status === 0
                      ? "Scrapping under process "
                      : item.status === 2
                      ? "Invalid URL"
                      : "Scraping completed"
                  }
                />
                <ListItemIcon>
                  {item.status === 0 ? (
                    <CircularProgress />
                  ) : item.status === 1 ? (
                    <DoneIcon />
                  ) : (
                    <CloseIcon />
                  )}
                </ListItemIcon>
              </ListItem>
              <Divider></Divider>
            </div>
          ))}
        </List>
      </Box>
      {checkScrapProcessStatus() && (
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button size="large" onClick={() => navigate("/")}>
            Process Completed!! Goto Home
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Scrap;
