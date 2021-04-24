import { useEffect, useState } from 'react';

import axios from 'axios';

export default function Game() {
  const [question, setQuestion] = useState();
  useEffect(() => {
    axios
      .get("questions")
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
   
  }, []);
  return (
    <div>
      <h1 className="generalHeadline">World Trivia</h1>

      <div className="game-page">
        <div>Question</div>
        <div>{question}</div>
      </div>
    </div>
  );
}
