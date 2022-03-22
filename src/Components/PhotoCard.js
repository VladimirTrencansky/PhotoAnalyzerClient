//@ts-check
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export default function PhotoCard({ photoData }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          src={`data:image/jpg;base64,${photoData.imageBase64}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {photoData.title}
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              aria-label={`info about ${photoData.title}`}
              onClick={() => setOpen(true)}
            >
              <InfoIcon />
            </IconButton>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Focal length: {photoData.focalLength} <br />
            Size: {photoData.width} x {photoData.height}
          </Typography>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Detail info</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <TextField
              id="title"
              label="Title"
              defaultValue={photoData.title}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
            <br />
            <TextField
              id="focalLength"
              label="Focal length"
              sx={{ marginTop: "10px" }}
              defaultValue={photoData.focalLength}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
            <br />
            <TextField
              id="size"
              label="Size"
              sx={{ marginTop: "10px" }}
              defaultValue={`${photoData.width} x ${photoData.height}`}
              InputProps={{
                readOnly: true,
              }}
              variant="standard"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
