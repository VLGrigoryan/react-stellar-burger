import PropTypes from "prop-types";

export const ingredientPropType = PropTypes.shape({
  count: PropTypes.number,
  _id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  });
