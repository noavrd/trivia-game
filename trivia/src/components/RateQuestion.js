import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';

function RateQuestion({ prevQuestion, prevOption }) {
  const [value, setValue] = useState();
  const [message, setMessage] = useState('');

  const ratingChanged = (newRating) => {};
  const starRating = {
    size: 40,
    count: 5,
    half: false,
    value: 3,

    onChange: async (newValue) => {
      try {
        const idTest = await takeId(prevQuestion, prevOption);
        setMessage('Thanks for rating!');
        setValue(value);
        await axios.put('rank', {
          rank: newValue,
          id: idTest,
        });
      } catch (err) {
        console.log(err);
      }
    },
  };

  useEffect(() => {
    setMessage('');
  }, [prevQuestion]);

  if (prevQuestion) {
    return (
      <div>
        {message ? (
          <div> {message}</div>
        ) : (
          <div>
            <h3>Rate previous question :</h3>
            <div className="star">
              <ReactStars {...starRating} />
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <></>;
  }
}

export default RateQuestion;
async function takeId(question, options) {
  try {
    const found = await axios.get('saved');
    const id = await found.data.find((saved) => {
      return (
        saved.question_name === question &&
        saved.answer_name === options[0] &&
        saved.option1 === options[1] &&
        saved.option2 === options[2] &&
        saved.option3 === options[3]
      );
    });

    return id.id;
  } catch (err) {
    console.log(err);
  }
}
