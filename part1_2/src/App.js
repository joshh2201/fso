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

const Statistics = (props) => {
  const [good, neutral, bad] = props.ratings;
  const sum = good + neutral + bad;
  const average = (good - bad) / sum; // good: 1, neutral: 0, bad: -1
  const positive = ((good / sum) * 100).toString() + '%'; // convert to string to concat % sign
  if (sum === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  } else {
    return (
      <>
        <Rating number={good} text='good' />
        <Rating number={neutral} text='neutral' />
        <Rating number={bad} text='bad' />
        <Rating number={sum} text='all' />
        <Rating number={average} text='average' />
        <Rating number={positive} text='positive' />
      </>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const ratings = [good, neutral, bad];
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
      <Statistics ratings={ratings} />
    </div>
  );
};

export default App;
