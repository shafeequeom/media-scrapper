import { Button, Container, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { scrapMedia } from "../functions/scrap";
import { useNavigate } from "react-router-dom";

const Scrap = () => {
  const navigate = useNavigate();
  const [urls, setUrls] = useState([""]);
  const handleSubmit = (e) => {
    e.preventDefault();
    scrapMedia(urls).then((res) => {
      if (res.status === 200) {
        navigate("/");
      }
    });
  };
  const handleUrlChange = (e, index) => {
    let currentUrls = [...urls];
    currentUrls[index] = e.target.value;
    setUrls(currentUrls);
  };

  const addNewRow = () => {
    let newUrls = [...urls];
    newUrls.push("");
    setUrls(newUrls);
  };
  return (
    <Container>
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
        >
          Scrap Image & Videos
        </Button>
      </Box>
    </Container>
  );
};

export default Scrap;
