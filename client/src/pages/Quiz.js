import React from 'react';
import Card from '../components/Card';
import data from '../__mocks__/questions'

const Quiz = () => (
  <>
  <h1>Quiz Page</h1>
  {data.map((item, index) => (
    <Card key={index} item={item} />
  ))}
  </>
);

export default Quiz;
