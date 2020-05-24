import React, { useState } from 'react';
import StarRatingComponent from 'react-star-rating-component';
const { v4: uuidv4 } = require('uuid');

const App = () => {
  const [reviews, setReviews] = useState([]);
  const [ratingInitial, setRatingInitial] = useState(0);
  const [error, setError] = useState(null);

  const onInitialStarClick = (nextValue) => {
    setRatingInitial(nextValue);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!ratingInitial) {
      setError({ msg: 'You did not rate, you must rate.' });
      return;
    }
    setError(null);
    const review = {
      id: uuidv4(),
      author: 'user ' + (reviews.length + 1),
      score: ratingInitial,
      text: e.target.reviewField.value,
      creationDate: new Date(),
    };
    console.log('review :>> ', review);
    setReviews([...reviews, review]);
    setRatingInitial(0);
    e.target.reviewField.value = '';
  };

  let totalStar = 0,
    average = 0;
  for (const review of reviews) {
    totalStar += review.score;
  }
  average = reviews.length === 0 ? 0 : totalStar / reviews.length;

  return (
    <div style={{ marginLeft: 20 }}>
      <h3>Average: {average.toFixed(2)}</h3>
      <div style={{ fontSize: 32 }}>
        <StarRatingComponent
          name="averageStar"
          starColor="#ffb400"
          emptyStarColor="#ffb400"
          value={average}
          editing={false}
          renderStarIcon={(index, value) => {
            return (
              <span>
                <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
              </span>
            );
          }}
          renderStarIconHalf={() => {
            return (
              <span>
                <span style={{ position: 'absolute' }}>
                  <i className="far fa-star" />
                </span>
                <span>
                  <i className="fas fa-star-half" />
                </span>
              </span>
            );
          }}
        />
      </div>
      <h3>{'Rate & Review Product'}</h3>
      <div style={{ fontSize: 34 }}>
        <StarRatingComponent
          name="initialStar"
          value={ratingInitial}
          onStarClick={onInitialStarClick}
        />
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" name="reviewField" />
        <button type="submit" className="pure-button-primary">
          Add
        </button>
        {error && <p>{error.msg}</p>}
      </form>
      <h3>All Reviews:</h3>
      {reviews.map((review, index) => (
        <div key={review.id} style={{ fontSize: 24 }}>
          <span style={{ marginRight: 50 }}>{review.author}</span>
          <span>
            {<StarRatingComponent key={index + 1} name={review.author} value={review.score} />}
          </span>
          <div style={{ maxWidth: 300 }}>
            <span style={{ fontSize: 16 }}>{review.text}</span>
            <div style={{ fontSize: 14 }}>{review.creationDate.toLocaleDateString('en-GB')}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
