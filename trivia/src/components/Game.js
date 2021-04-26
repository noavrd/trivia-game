import { useEffect, useMemo, useState } from 'react';
import RateQuestion from './RateQuestion';
import axios from 'axios';
import home from "./home.png"
import { Link } from "react-router-dom";


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
  const [strikes, setStrikes] = useState(0);

  const [id, setId] = useState();
  const randomOptions = useMemo(() => shuffleArray(options), [options]);

  useEffect(() => {
    getQuestion();
  }, []);

  //add score by your answer
  const rightAnswer = () => {
    setTimeout(() => {
      getQuestion();
    }, 1000);
    return setScore(score + 100);
  };
  const wrongAnswer = () => {
    getQuestion();
    setStrikes(strikes + 1)
    return setScore(score);
  };

  const exit = (e) => {
    if (!window.confirm("Are you sure you want to Exit?")) {
      e.preventDefault();
    } 
  }


  if(strikes === 3) {
    return (
      <div>
         <h1 className="generalHeadline">World Trivia</h1>
        <div className="game-page">
         <div>Game Over</div>
         <div>score: {score}</div>
         {/* add rank */}
         {/* <div>You`ve finished {rank}</div> */}

        </div>
         <Link
                to={{ pathname: '/' }}>
                <img src={home}></img><br/>
        </Link>
      </div>
    )
  }
  return (
    <div>
      <h1 className="generalHeadline">World Trivia</h1>
      <CheckIfSaved />
      <TakeId question={question} options={options} />
      <RateQuestion />
      <div className="game-page">
          <span>score: {score}</span>
          <span className={`strikes ${strikes === 1 || strikes === 2 ?"have-strike": ""}`}>X </span>
          <span className={`strikes ${strikes === 2 ? "have-strike" :""}`}>X </span>
          <span className="strikes">X </span>

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
        <Link
                to={{ pathname: '/' }}>
                <img src={home} onClick={ (e) => exit(e)}></img><br/>
        </Link>
    </div>
  );
}
function CheckIfSaved(questions, options) {
  let ifSaved = '';
  let savedQuestion = [];
  axios
    .get('saved')
    .then((result) => {
      savedQuestion = result.data;
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(savedQuestion);
  savedQuestion.map((saved) =>
    saved.question_name === questions && saved.options === options
      ? (ifSaved = saved)
      : ''
  );
  if (ifSaved === '') {
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
  return <></>;
}
function TakeId(question, options) {
  let found;
  let questionArr = [];
  let id;
  axios
    .get('saved')
    .then((result) => {
      questionArr = result.data;
      console.log(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
  questionArr.map((saved) =>
    saved.question_name === question && saved.options === options
      ? (found = saved)
      : ''
  );
  console.log(found);
  if (found !== undefined) {
    id = found.id;
    console.log(id);
    return id;
  }
  return <></>;
}

function shuffleArray(array) {
  const array2 = array.slice();
  for (let i = array2.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array2[i], array2[j]] = [array2[j], array2[i]];
  }
  return array2;
}
