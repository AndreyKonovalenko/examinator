import React from 'react';
import { Helmet } from 'react-helmet';
import Card from '../components/Card';
import uniqid from 'uniqid';
import data from '../__mocks__/questions';
import shuffle from '../utils/shuffle';

const Quiz = () => (
  <>
    <Helmet>
      <meta charSet='utf-8' />
      <title>Quiz | Examinator </title>
    </Helmet>
    <h1>Quiz Page</h1>
    {shuffle(data).map((item) => (
      <Card key={uniqid()} item={item} />
    ))}
  </>
);

export default Quiz;
