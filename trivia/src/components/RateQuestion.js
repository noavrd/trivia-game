import axios from 'axios';
import { useEffect, useState } from 'react';

function RateQuestion({ prevQuestion, prevOption }) {
  const [rate, setRate] = useState(0);
  const [id, setId] = useState(0);
  useEffect(() => {
    setId(takeId(prevQuestion, prevOption));
    console.log('hellooooooo');
  }, [prevQuestion]);

  useEffect(() => {
    axios.put('/rank', {
      rank: rate,
      id: id,
    });
    console.log('update');
  }, [rate]);
  return (
    <div>
      <h3>Rate me:</h3>
      <span onClick={() => setRate(1)} className="fa fa-star"></span>
      <span onClick={() => setRate(2)} className="fa fa-star"></span>
      <span onClick={() => setRate(3)} className="fa fa-star"></span>
      <span onClick={() => setRate(4)} className="fa fa-star"></span>
      <span onClick={() => setRate(5)} className="fa fa-star"></span>
    </div>
  );
}

export default RateQuestion;

async function takeId(question, options) {
  try {
    const { data: questionArr } = await axios.get('saved');

    const found = questionArr.find((saved) => {
      console.log(saved.question_name === question);
      console.log(saved.answer_name === options[0]);
      console.log(saved.option1 === options[1]);
      console.log(saved.option2 === options[2]);
      console.log(saved.option3 === options[3]);
      console.log(saved);
      return (
        saved.question_name === question &&
        saved.answer_name === options[0] &&
        saved.option1 === options[1] &&
        saved.option2 === options[2] &&
        saved.option3 === options[3]
      );
    });

    if (found !== undefined) {
      window.alert(found.id);
      return found.id;
    }
  } catch (e) {
    alert(e.message);
  }
}
