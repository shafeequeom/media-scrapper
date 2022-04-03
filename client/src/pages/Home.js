import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getScrapPagination } from "../functions/scrap";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("image");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getScrapedMedias();
  }, [page]);

  const getScrapedMedias = () => {
    getScrapPagination(page).then((res) => {
      if (res.status == 200) {
        setMedias(res.data.data);
      }
    });
  };
  return (
    <Container sx={{ py: 8 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Grid item xs={12} sm={4} md={3}>
          <FormControl fullWidth>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              value={type}
              label="Age"
              onChange={getScrapedMedias}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="image">Images</MenuItem>
              <MenuItem value="video">Video</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="Search">Search</InputLabel>
            <OutlinedInput
              id="search"
              type="search"
              value={search}
              onChange={getScrapedMedias}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="Search"
            />
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {medias.map((media) => (
          <Grid item key={media.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height={140}
                image={media.url}
                alt="random"
                style={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {media.fileName}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View</Button>
                <Button size="small">Edit</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
