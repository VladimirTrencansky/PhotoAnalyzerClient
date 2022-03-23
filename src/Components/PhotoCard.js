//@ts-check
import InfoIcon from "@mui/icons-material/Info";
import { Backdrop, CircularProgress, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import DetailDialog from "./DetailDialog";

export default function PhotoCard({ photoData }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          src={`data:image/jpg;base64,${photoData.imageBase64}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {photoData.title}
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              aria-label={`info about ${photoData.title}`}
              onClick={() => {
                setOpen(true);
              }}
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

      {open ? (
        <DetailDialog
          isOpen={open}
          setOpen={(x) => setOpen(x)}
          photoData={photoData}
        />
      ) : null}
    </>
  );
}
