import PropTypes from 'prop-types';

export const ingredientPropType = {
  count: PropTypes.number,
  _id: PropTypes.string,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};