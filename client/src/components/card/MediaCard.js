import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
// import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const MediaCard = ({ media }) => {
  return (
    <Card
      variant="outlined"
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <CardMedia
        component="img"
        height={140}
        src={media.fileUrl}
        alt="random"
        style={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h6">
          {media.fileName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button endIcon={<VisibilityIcon />} size="small">
          View
        </Button>
        {/* <Button endIcon={<DeleteIcon />} size="small">
          Delete
        </Button> */}
      </CardActions>
    </Card>
  );
};

export default MediaCard;
