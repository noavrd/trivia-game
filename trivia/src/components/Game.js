import { useEffect, useMemo, useState } from 'react';
import RateQuestion from './RateQuestion';
import axios from 'axios';

export default function Game() {
  const getQuestion = () => {
    axios
      .get('questions')
      .then((result) => {
        setOptions(result.data.options);
        setAnswer(result.data.options[0]);
        setQuestion(result.data.question);
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
  const [savedQuestion, setSavedQuestion] = useState([]);
  const [ifSaved, setIfSaved] = useState('');

  const randomOptions = useMemo(() => getRandomOptions(options), [options]);

  useEffect(() => {
    getQuestion();
  }, []);

  //add score by your answer
  const rightAnswer = () => {
    setTimeout(() => {
      checkIfSaved(question, options);
      getQuestion();
    }, 1000);
    return setScore(score + 100);
  };
  const wrongAnswer = () => {
    getQuestion();
    return setScore(score);
  };

  //check if question is saved

  function checkIfSaved(questions, options) {
    setIfSaved('');
    console.log(ifSaved);
    axios
      .get('saved')
      .then((result) => {
        console.log(result);
        setSavedQuestion(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
    savedQuestion.map((saved) =>
      saved.question_name === questions && saved.options === options
        ? setIfSaved(saved)
        : ''
    );
    console.log(questions);
    console.log(question);
    console.log(options);
    if (ifSaved === '' && questions !== null) {
      axios
        .post('savequestions', {
          options: options,
          question_name: questions,
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div>
      <h1 className="generalHeadline">World Trivia</h1>
      <RateQuestion />
      <div className="game-page">
        <div>score: {score}</div>
        <div>{question}</div>

        {randomOptions.map((option, i) =>
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

const getRandomOptions = (options) => {
  let shuffled = options.sort(() => 0.5 - Math.random());
  return shuffled;
};
