import { Button, Container, TextField } from "@mui/material";
import { Box } from "@mui/system";

const Scrap = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="url"
          label="Website Address"
          name="url"
          autoFocus
        />
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
