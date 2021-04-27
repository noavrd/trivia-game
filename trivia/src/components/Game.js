import { useEffect, useMemo, useState } from 'react';
import RateQuestion from './RateQuestion';
import axios from 'axios';
import home from './home.png';
import { Link, useLocation } from 'react-router-dom';

export default function Game() {
  const queryParams = useQuery();

  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState('');
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState('');
  const [strikes, setStrikes] = useState(0);
  const [seconds, setSeconds] = useState(20);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [startedTime, setStartedTime] = useState(20);
  const [previousQuestion, setPreviousQuestion] = useState('');
  const [previousOptions, setPreviousOptions] = useState([]);

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

  useEffect(() => {
    getQuestion();
  }, []);

  useEffect(() => {
    if (question !== '') {
      checkIfSaved(question, options);
      // takeId(question, options);
    }
  }, [question]);

  useEffect(() => {
    let timer;
    if (seconds === 0.5) {
      timer = setInterval(() => setSeconds(seconds - 0.5), 500);
    } else {
      timer = seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [seconds]);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     if (seconds > 0) {
  //       setSeconds(seconds - 1);
  //     }
  //   }, 1000);

  //   return () => clearTimeout(timeout);
  // }, [seconds]);
  const randomOptions = useMemo(() => shuffleArray(options), [options]);

  //add score by your answer
  const rightAnswer = () => {
    setTimeout(() => {
      setScore((prev) =>
        Math.floor(
          prev + ((1 - (startedTime - seconds) / startedTime) * 70 + 30)
        )
      );
      setPreviousQuestion(question);
      setPreviousOptions(options);
      getQuestion();
      let correctAnswers;
      setCorrectAnswer((prev) => {
        correctAnswers = prev;
        return prev + 1;
      });
      setSeconds(startedTime > 5 ? 20 - 0.5 * correctAnswers : 5);
      setStartedTime((prev) => (prev > 5 ? 20 - 0.5 * correctAnswers : 5));
    }, 1000);
  };
  const wrongAnswer = () => {
    setSeconds(startedTime);
    setPreviousQuestion(question);
    setPreviousOptions(options);

    getQuestion();
    setStrikes(strikes + 1);
    return setScore(score);
  };

  const exit = (e) => {
    if (!window.confirm('Are you sure you want to Exit?')) {
      e.preventDefault();
    }
  };

  if (strikes === 3) {
    return (
      <div>
        <h1 className="generalHeadline">World Trivia</h1>
        <div className="game-page">
          <div>Game Over</div>
          <div>score: {score}</div>
          {/* add rank */}
          {/* <div>You`ve finished {rank}</div> */}
        </div>
        <Link to={{ pathname: '/' }}>
          <img src={home}></img>
          <br />
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <div> {seconds}</div>
        {seconds === 0 ? wrongAnswer() : ''}
        <h1 className="generalHeadline">World Trivia</h1>

        <RateQuestion
          prevQuestion={previousQuestion}
          prevOption={previousOptions}
        />
        <div className="game-page">
          <span>score: {score}</span>
          <span
            className={`strikes ${
              strikes === 1 || strikes === 2 ? 'have-strike' : ''
            }`}
          >
            X{' '}
          </span>
          <span className={`strikes ${strikes === 2 ? 'have-strike' : ''}`}>
            X{' '}
          </span>
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
        <Link to={{ pathname: '/' }}>
          <img src={home} onClick={(e) => exit(e)}></img>
          <br />
        </Link>
      </div>
    );
  }
}

function useQuery() {
  let queryParams = new URLSearchParams(useLocation().search);
  queryParams = queryParams.get('userName');
  return queryParams;
}

async function checkIfSaved(questions, options) {
  try {
    let ifSaved = '';
    const { data: savedQuestion } = await axios.get('saved');
    savedQuestion.find((saved) =>
      saved.question_name === questions &&
      saved.answer_name === options[0] &&
      saved.option1 === options[1] &&
      saved.option2 === options[2] &&
      saved.option3 === options[3]
        ? (ifSaved = saved)
        : ''
    );
    if (ifSaved === '') {
      axios.post('savequestions', {
        options: options,
        question_name: questions,
      });
    }
  } catch (err) {
    alert(err);
  }

  // axios
  //   .get('saved')
  //   .then((result) => {
  //     savedQuestion = result.data;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // savedQuestion.find((saved) =>
  //   saved.question_name === questions &&
  //   saved.answer_name === options[0] &&
  //   saved.option1 === options[1] &&
  //   saved.option2 === options[2] &&
  //   saved.option3 === options[3]
  //     ? (ifSaved = saved)
  //     : ''
  // );
  // if (ifSaved === '') {
  //   axios
  //     .post('savequestions', {
  //       options: options,
  //       question_name: questions,
  //     })
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
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
