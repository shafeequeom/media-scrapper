import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { currentUser } from "../functions/auth";

const Profile = () => {
  const [user, setUser] = useState({});
  const getUserData = () => {
    currentUser().then((res) => {
      if (res.status === 200) {
        setUser(res.data.data);
      }
    });
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ height: "90vh" }}
      >
        <Grid item>
          <Card>
            <CardActionArea>
              <Box
                sx={{ display: "flex", justifyContent: "space-around", p: 4 }}
              >
                <Avatar>{user.name && user.name.charAt(0)}</Avatar>
              </Box>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
