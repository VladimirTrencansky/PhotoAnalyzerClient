//@ts-check
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "./Chart";

function DetailDialog({ isOpen, setOpen, photoData }) {
  const [isLoading, setIsLoading] = useState(true);
  const [histogramData, setHistogramData] = useState();

  const getHistogramData = async () => {
    var result = null;
    const formData = new FormData();
    formData.append("base64image", photoData.imageBase64);
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      result = await axios.post(
        "https://localhost:7100/api/PhotoAnalyzer/GetHistogramData",
        formData,
        config
      );
    } catch (ex) {
      console.log(ex);
    }

    return result;
  };

  useEffect(() => {
    setIsLoading(true);

    getHistogramData()
      .then((response) => {
        setHistogramData(response.data);
        setIsLoading(false);
      })
      .catch((ex) => {
        setIsLoading(false);
        console.log(ex);
      });
  }, []);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setOpen(false)}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Detail info</DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          <Grid container spacing={1}>
            <Grid container item>
              <TextField
                id="title"
                label="Title"
                defaultValue={photoData.title}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
            </Grid>
            <Grid container item>
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
            </Grid>
            <Grid container item>
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
            </Grid>
            <Grid container item>
              <TextField
                id="size"
                label="Manufacturer"
                sx={{ marginTop: "10px" }}
                defaultValue={photoData.manufacturer}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
            </Grid>
            <Grid container item>
              <TextField
                id="size"
                label="Model"
                sx={{ marginTop: "10px" }}
                defaultValue={photoData.model}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
            </Grid>
            <Grid container item>
              <TextField
                id="size"
                label="Created"
                sx={{ marginTop: "10px" }}
                defaultValue={photoData.dateTime}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
            </Grid>

            <Grid container item>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Chart histogramData={histogramData} />
              )}
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DetailDialog;
function setState() {
  throw new Error("Function not implemented.");
}
