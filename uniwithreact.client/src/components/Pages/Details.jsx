import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Details = () => {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          
            <Img
              alt="complex"
              src="https://cdn.pixabay.com/photo/2016/12/27/06/38/albert-einstein-1933340_640.jpg"
            />
          <Typography gutterBottom variant="subtitle1" >
                Professor Name
              </Typography>
        </Grid>
        <Grid item xs={6} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                
              </Typography>
              <Typography variant="body2" gutterBottom>
                
              </Typography>
              <Typography variant="body2" color="text.secondary">
               
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: "pointer" }} variant="body2">
               
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
             
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Details