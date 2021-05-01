import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';

function RateQuestion({ prevQuestion, prevOption }) {
  const [value, setValue] = useState();

  const ratingChanged = (newRating) => {};
  const starRating = {
    size: 40,
    count: 5,
    half: false,
    value: 3,

    onChange: async (newValue) => {
      try {
        const idTest = await takeId(prevQuestion, prevOption);
        // setId(idTest);
        console.log(idTest);
        setValue(value);
        await axios.put('rank', {
          rank: newValue,
          id: idTest,
        });
      } catch (err) {
        console.log(err);
      }
      // console.log(newValue);
    },
  };

  // console.log(id);
  if (prevQuestion) {
    return (
      <div>
        <h3>Rate previous question :</h3>
        <div className="star">
          <ReactStars {...starRating} />
        </div>
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
