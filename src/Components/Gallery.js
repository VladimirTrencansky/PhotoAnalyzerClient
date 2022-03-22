//@ts-check
import { CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import ImageList from "@mui/material/ImageList";
import * as React from "react";
import PhotoCard from "./PhotoCard";

export default function Gallery({ data }) {
  return (
    <>
      {data != null && data.length > 0 ? (
        <Card variant="outlined" className="gallery-card">
          <CardContent>
            <ImageList sx={{ width: "100%", height: "100%" }} cols={5}>
              {data.map((item, index) => (
                <PhotoCard photoData={{ ...item }} key={index} />
              ))}
            </ImageList>
          </CardContent>
        </Card>
      ) : null}
    </>
  );
}
