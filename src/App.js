//@ts-check
import { Card, CardContent, Grid, useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.scss";
import FilePicker from "./Components/FilePicker";
import Gallery from "./Components/Gallery";
import CircularProgressWithLabel from "./Components/CircularProgressWithLabel";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const pageSize = 5;

  const [processedData, setProcesssedData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(null);
  const [progress, setProgress] = useState(0);

  const clearStates = () => {
    setProcesssedData([]);
    setLoadingText(null);
    setProgress(0);
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  const paginate = (array, pageSize, pageNumber) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };

  const uploadAndProcessPhotos = async (data) => {
    const formData = new FormData();
    var result = null;
    data.forEach((file) => {
      formData.append("formFile", file);
    });

    try {
      result = await axios.post("https://localhost:7100/api/PhotoAnalyzer", formData);
    } catch (ex) {
      console.log(ex);
      setIsLoading(false);
    }

    return result;
  };

  useEffect(() => {
    setProgress((processedData.length / selectedFiles.length) * 100);
  }, [processedData]);

  const processFiles = async () => {
    setIsLoading(true);
    setLoadingText("Processing photos");
    const pageCount = selectedFiles.slice(pageSize).length;

    for (let i = 1; i < pageCount; i++) {
      const page = paginate(selectedFiles, pageSize, i);

      if (page != null && page.length > 0) {
        const processResponse = await uploadAndProcessPhotos(page);
        setProcesssedData((oldValue) => [...oldValue, ...processResponse.data]);
      }
    }
    setLoadingText("Processing done");
    setIsLoading(false);
  };

  const getInfo = () => {
    return (
      <div className="info">
        <div>Selected files: {selectedFiles.length} </div>
        <div>Processed files: {processedData.length} </div>
      </div>
    );
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <h1>Photo analyzer</h1>
                {isLoading ? (
                  <>
                    <CircularProgressWithLabel value={progress} />
                  </>
                ) : (
                  <FilePicker
                    processFiles={processFiles}
                    setSelectedFiles={(x) => {
                      clearStates();
                      setSelectedFiles(Array.from(x));
                    }}
                  />
                )}
                {selectedFiles && selectedFiles.length > 0 ? getInfo() : null}
                <br />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Gallery data={processedData} />
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default App;
