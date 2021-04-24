import { useEffect, useState } from 'react';

import axios from 'axios';

export default function Game() {
  const getQuestion = () => {
    axios
      .get('questions')
      .then((result) => {
        setQuestion(result.data.question);
        setOptions(result.data.options);
        setAnswer(result.data.options[0]);
      })
      .catch((err) => console.log(err));
  };
  const findRightAnswer = (option) => {
    if (answer !== '') {
      if (option === answer) {
        return true;
      }
      return false;
    }
  };
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState('');
  const [score, setScore] = useState(0);

  const [answer, setAnswer] = useState('');
  useEffect(() => {
    getQuestion();
  }, []);

  //add score by your answer
  const rightAnswer = () => {
    getQuestion();
    return setScore(score + 100);
  };
  const wrongAnswer = () => {
    getQuestion();
    return setScore(score);
  };
  console.log(question);
  console.log(answer);
  console.log(options);
  return (
    <div>
      <h1 className="generalHeadline">World Trivia</h1>

      <div className="game-page">
        <div>score: {score}</div>
        <div>{question}</div>

        {randomOptions(options).map((option, i) =>
          findRightAnswer(option) ? (
            <div key={i} onClick={rightAnswer}>
              {option}{' '}
            </div>
          ) : (
            <div key={i} onClick={wrongAnswer}>
              {option}
            </div>
          )
        )}
      </div>
    </div>
  );
}

const randomOptions = (options) => {
  let shuffled = options.sort(() => 0.5 - Math.random());
  return shuffled;
};
