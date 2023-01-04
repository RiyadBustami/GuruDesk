import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import {ReactComponent as Logo} from '../images/gurudesklogo.svg';
import img4 from '../images/4.png';
import img5 from '../images/5.png';
import img6 from '../images/6.png';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: '' }}
    >
      <Container sx={{ mt: 10, mb: 15, display: 'flex', position: 'relative', flexDirection: 'column', alignItems: 'center',}}>
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
            <Typography variant="h4" align="center" marked="center" component="h2" sx={{ mb: 14 }}>
            Why Choose GuruDesk?
            </Typography>
            <div>
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
            <img src={img4} style={{width: "50%"}}></img>
              <Typography variant="h6" sx={{ my: 5 }} align="center">
                Give customers the best support
              </Typography>
              <Typography variant="h5" align="center">
                {
                  'Our ultimate goal is to help you make your customers a little bit happier with every message they receive.'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
            <img src={img5} style={{width: "50%"}}></img>
              <Typography variant="h6" sx={{ my: 5 }} align="center">
                Save Time and Increase Efficiency
              </Typography>
              <Typography variant="h5" align="center">
                {
                  'We help you maximize your productivity. Your team can manage their tickets and reply to customer messages all from the same place.'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
            <img src={img6} style={{width: "50%"}}></img>
              <Typography variant="h6" sx={{ my: 5 }} align="center">
                Become an industry leader
              </Typography>
              <Typography variant="h5" align="center">
                {'We provide the software so you can focus on meeting your customer needs and keeping your business in sync.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
            </div>
      </Container>
    </Box>
  );
}

export default ProductValues;