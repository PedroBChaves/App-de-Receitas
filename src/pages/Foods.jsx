import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { foodsAPIOnLoad } from '../services/APIsOnLoad';
import FoodCard from './components/FoodCard';
import { categoryFoodAPI, recipesOfFoodsByCategory } from '../services/categorysAPI';
import { recipeFoodsOnLoad } from '../store/actions';

class Foods extends Component {
  constructor() {
    super();

    this.state = {
      recipesOnLoad: [],
      filteredRecipes: [],
      categorys: [],
      filteredCategory: '',
    };
  }

  async componentDidMount() {
    await this.requestAPIOnLoad();
  }

  requestAPIOnLoad = async () => {
    const allRecipes = await foodsAPIOnLoad();
    const categorys = await categoryFoodAPI();
    this.setState({
      recipesOnLoad: allRecipes,
      filteredRecipes: allRecipes,
      categorys,
    });
  }

  renderRecipes = (recipes) => {
    const MAX_LENGTH = 12;
    let allRecipes = [];

    if (recipes.length === 1) {
      return (
        <div>
          <Redirect to={ `/foods/${recipes[0].idMeal}` } />
        </div>
      );
    }

    if (recipes.length > MAX_LENGTH) {
      allRecipes = recipes.slice(0, MAX_LENGTH);
    } else {
      allRecipes = recipes;
    }

    return (
      <div>
        <FoodCard allRecipes={ allRecipes } />
      </div>
    );
  }

  onClickCategory = async (category) => {
    const { searchFood } = this.props;
    const { filteredCategory } = this.state;
    const recipesByCategory = await recipesOfFoodsByCategory(category);

    if (filteredCategory === category) {
      searchFood(false);
      this.setState({
        filteredCategory: '',
      });
    } else {
      searchFood(true);
      this.setState({
        filteredRecipes: recipesByCategory,
        filteredCategory: category,
      });
    }
  }

  render() {
    const { recipesOnLoad, categorys, filteredRecipes } = this.state;
    const { history, recipes, search, searchFood } = this.props;

    return (
      <div>
        <Header
          history={ history }
          name="Foods"
          hideSearch={ false }
          drinkPage={ false }
        />

        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => searchFood(false) }
        >
          All
        </button>

        {categorys.map(({ strCategory }) => (
          <button
            type="button"
            key={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => this.onClickCategory(strCategory) }
          >
            {strCategory}
          </button>
        ))}

        {!search
          ? <FoodCard allRecipes={ recipesOnLoad } />
          : <FoodCard allRecipes={ filteredRecipes } />}

        { recipes === null
          ? global.alert('Sorry, we haven\'t found any recipes for these filters.')
          : this.renderRecipes(recipes) }
        <Footer />
      </div>
    );
  }
}

Foods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  recipes: PropTypes.arrayOf,
  search: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  recipes: state.getRecipesReducer.recipes,
  search: state.getRecipesReducer.searchFood,
});

const mapDispatchToProps = (dispatch) => ({
  searchFood: (state) => dispatch(recipeFoodsOnLoad(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
