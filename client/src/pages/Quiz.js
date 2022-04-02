import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@mui/material';

const FsspParser = (props) => (
  <>
    <Helmet>
      <title>FsspParser | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3,
      }}>
      <Container maxWidth='lg'>
        <Box sx={{ pt: 3 }}></Box>
      </Container>
    </Box>
  </>
);

export default FsspParser;
