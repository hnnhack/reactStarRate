import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      starObject: [],
      ratingInitial: 0,
    };
  }

  onInitialStarClick = (nextValue) => {
    this.setState({ ratingInitial: nextValue });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const object = {
      name: 'user ' + (this.state.starObject.length + 1),
      value: this.state.ratingInitial,
      review: '',
      time: new Date().toISOString().substr(0, 10),
    };
    if (object.value === 0) alert('You did not rate, you must rate.');
    else {
      object.review = e.target.reviewField.value;
      this.state.starObject.push(object);
      this.setState({
        ratingInitial: 0,
      });
      e.target.reviewField.value = '';
    }
  };

  render() {
    const { starObject, ratingInitial } = this.state;
    let totalStar = 0,
      average = 0;
    for (let key in starObject) {
      totalStar += starObject[key].value;
    }
    starObject.length === 0 ? (average = 0) : (average = totalStar / starObject.length);
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

        <h3>Rate & Review Product</h3>
        <div style={{ fontSize: 34 }}>
          <StarRatingComponent
            name="initialStar"
            value={ratingInitial}
            onStarClick={this.onInitialStarClick.bind(this)}
          />
        </div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" name="reviewField" />
          <button type="submit" className="pure-button-primary">
            Add
          </button>
        </form>
        <h3>All Reviews:</h3>
        {starObject.map((star, index) => (
          <div style={{ fontSize: 24 }}>
            <span style={{ marginRight: 50 }}>{star.name}</span>
            <span>
              {<StarRatingComponent key={index + 1} name={star.name} value={star.value} />}
            </span>
            <div style={{ maxWidth: 300 }}>
              <span style={{ fontSize: 16 }}>{star.review}</span>
              <div style={{ fontSize: 14 }}>{star.time}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
