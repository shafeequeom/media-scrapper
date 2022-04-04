import { Grid, Skeleton } from "@mui/material";

const LoadingCards = () => {
  return (
    <Grid container spacing={4}>
      {Array.from(new Array(4)).map((media, index) => (
        <Grid item key={index} xs={6} sm={4} md={3}>
          <Skeleton variant="rectangular" height={140} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
      ))}
    </Grid>
  );
};

export default LoadingCards;
