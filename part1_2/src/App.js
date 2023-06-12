import { useState } from 'react';

const Header = (props) => {
  return (
    <>
      <h1>{props.text}</h1>
    </>
  );
};

const Button = (props) => {
  const { handleClick, text } = props;
  console.log(props);
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

const Rating = (props) => {
  // render the number of ratings for each category
  const { text, number } = props;
  return (
    <>
      <p>
        {text} {number}
      </p>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const sum = good + neutral + bad;
  const average = (good - bad) / sum;
  const positive = good / sum * 100;
  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Header text='statistics' />
      <Rating number={good} text='good' />
      <Rating number={neutral} text='neutral' />
      <Rating number={bad} text='bad' />
      <Rating number={sum} text='all' />
      <Rating number={average} text='average' />
      <Rating number={positive.toString()+'%'} text='positive' />
    </div>
  );
};

export default App;
