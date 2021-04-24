import { useEffect, useState } from 'react';

import axios from 'axios';

export default function Game() {
  const findRightAnswer = (option) => {
    if (answer !== '') {
      if (option === answer) {
        console.log(1);
        return true;
      }
      console.log(2);

      return false;
    }
  };
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState('');

  const [answer, setAnswer] = useState('');
  useEffect(() => {
    axios
      .get('questions')
      .then((result) => {
        setQuestion(result.data.question);
        setOptions(result.data.options);
        setAnswer(result.data.options[0]);
        console.log(4);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(5);
  console.log(answer);
  console.log(options);
  return (
    <div>
      <h1 className="generalHeadline">World Trivia</h1>

      <div className="game-page">
        <div>Question</div>
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
const rightAnswer = () => {
  return console.log('right answer');
};
const wrongAnswer = () => {
  return console.log('wrong answer');
};

const randomOptions = (options) => {
  let shuffled = options.sort(() => 0.5 - Math.random());
  console.log(3);
  return shuffled;
};
