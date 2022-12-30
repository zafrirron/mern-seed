import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

interface containerProps {
  content? : any
}


const Midcontainer = (props : containerProps) => {
  const {
    content
  } = props

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} zeroMinWidth>
          <Paper  elevation={8} square={false}
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
            >
              {content}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
export default Midcontainer
