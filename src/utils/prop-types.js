import PropTypes from 'prop-types';

export const ingredientPropType = {
  count: PropTypes.number,
  _id: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  onClick: PropTypes.func,
};

export const ModalPropTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export const IngredientDetailsprotoTypes = {
  data: ingredientPropType.isRequired
};

export const ModalOverlayPropTypes = {
  onClick: PropTypes.func.isRequired
};