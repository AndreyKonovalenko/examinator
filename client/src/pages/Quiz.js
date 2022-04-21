import React from 'react';
import { Helmet } from 'react-helmet';
import Card from '../components/Card';

const Quiz = () => {
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Quiz | Examinator </title>
      </Helmet>
      <h1>Quiz Page</h1>
      <Card />
    </>
  );
};

export default Quiz;
