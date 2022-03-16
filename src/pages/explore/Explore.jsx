import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../../styles/explore.css';

export default class Explore extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header history={ history } name="Explore" hideSearch />
        <div className="explore-container">
          <button
            className="expl-btn"
            onClick={ () => history.push('/explore/foods') }
            data-testid="explore-foods"
            type="button"
          >
            Explore Foods
          </button>
          <button
            className="expl-btn"
            onClick={ () => history.push('/explore/drinks') }
            data-testid="explore-drinks"
            type="button"
          >
            Explore Drinks
          </button>
        </div>

        <Footer />
      </div>
    );
  }
}

Explore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
