import axios from 'axios';

function RateQuestion({ id }) {
  console.log(id);
  return (
    <div>
      <h3>Rate me:</h3>
      <span className="fa fa-star"></span>
      <span className="fa fa-star"></span>
      <span className="fa fa-star"></span>
      <span className="fa fa-star"></span>
      <span className="fa fa-star"></span>
    </div>
  );
}

export default RateQuestion;
