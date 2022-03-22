//@ts-check

import { Button, Grid } from "@mui/material";
import { useState } from "react";

function FilePicker({ processFiles, setSelectedFiles }) {
  const [files, setFiles] = useState([]);
  const selectFile = (e) => {
    setFiles(e.target.files);
    setSelectedFiles(e.target.files);
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="flex-start"      
        spacing={2}>
        <Grid item xs={2}>
          <Button variant="contained" component="label">
            Select files
            <input
              type="file"
              accept="image/*"
              hidden
              multiple
              onChange={selectFile}
            />
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={processFiles}
            disabled={files.length == 0}
            variant="outlined"
          >
            Upload
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default FilePicker;
