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
import { getScrapPagination, getTotal } from "../functions/scrap";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Pagination } from "@mui/material";

const Home = () => {
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("image");
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(1);
  const [perPage, setPerPage] = useState(12);

  useEffect(() => {
    getScrapedMedias();
  }, [page, perPage, type]);

  useEffect(() => {
    getTotalPages();
  }, []);

  const getScrapedMedias = () => {
    getScrapPagination(page, perPage, type, search).then((res) => {
      if (res.status == 200) {
        setMedias(res.data.data);
      }
    });
  };

  const getTotalPages = () => {
    getTotal().then((res) => {
      if (res.status == 200) {
        let total = Math.ceil(res.data.data / perPage);
        setTotal(total);
      }
    });
  };

  const handlePageChange = (e, v) => {
    e.preventDefault();
    setPage(v);
  };

  const handleTypeChange = (e) => {
    e.preventDefault();
    setType(e.target.value);
    if (page > 1) {
      setPage(1);
    }
  };

  const debounce = (fxn, time) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fxn(...args);
      }, time);
    };
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleSearchDebounce = debounce((e) => {
    e.preventDefault();
    getScrapedMedias();
    if (page > 1) {
      setPage(1);
    }
  }, 1000);

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
              onChange={handleTypeChange}
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
              onChange={handleSearch}
              onKeyDown={handleSearchDebounce}
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
          <Grid item key={media.id} xs={6} sm={4} md={3}>
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
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{ mt: 4 }}
      >
        <Pagination
          color="secondary"
          count={total}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
        />
      </Grid>
    </Container>
  );
};

export default Home;
