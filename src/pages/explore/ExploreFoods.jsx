import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { randomFood } from '../../services/randomRecipeAPI';
import '../../styles/explore.css';

export default class ExploreFoods extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
    };
  }

  componentDidMount() {
    this.randomApiFood();
  }

  randomApiFood = async () => {
    const fetchFood = await randomFood();
    const randomIdMeal = fetchFood[0].idMeal;
    this.setState({
      id: randomIdMeal,
    });
  }

  render() {
    const { history } = this.props;
    const { id } = this.state;
    return (
      <div>
        <Header history={ history } name="Explore Foods" hideSearch />
        <div className="explore-container">
          <button
            className="expl-btn"
            onClick={ () => history.push('/explore/foods/ingredients') }
            data-testid="explore-by-ingredient"
            type="button"
          >
            By Ingredient
          </button>
          <button
            className="expl-btn"
            onClick={ () => history.push('/explore/foods/nationalities') }
            data-testid="explore-by-nationality"
            type="button"
          >
            By Nationality
          </button>
          <button
            className="expl-btn"
            onClick={ () => history.push(`/foods/${id}`) }
            data-testid="explore-surprise"
            type="button"
          >
            Surprise me!
          </button>
        </div>
        <Footer />
      </div>
    );
  }
}

ExploreFoods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
