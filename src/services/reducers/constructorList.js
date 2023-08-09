import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  bun: null,
  ingredients: [],
  counters: {},
};

export const constructorSlice = createSlice({
  name: 'constructorList',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const previousBunId = state.bun ? state.bun._id : null;

      if (action.payload.type === 'bun') {
        if (previousBunId && state.counters[previousBunId]) {
          state.counters[previousBunId] = 0;
        }
        state.bun = { ...action.payload, uuid: uuidv4() };
        state.counters[action.payload._id] = 2;
      } else {
        state.ingredients.push({ ...action.payload, uuid: uuidv4() });
        state.counters[action.payload._id] = state.counters[action.payload._id] ? state.counters[action.payload._id] + 1 : 1;
      }
    },
    removeIngredient: (state, action) => {
      const uuidToRemove = action.payload;
      const ingredient = state.ingredients.find(ingredient => ingredient.uuid === uuidToRemove);

      if (ingredient) {
        state.ingredients = state.ingredients.filter(
          (ingredient) => ingredient.uuid !== uuidToRemove
        );

        state.counters[uuidToRemove] = state.counters[uuidToRemove] - 1;
        if (state.counters[ingredient._id] > 0) {
          state.counters[ingredient._id] = state.counters[ingredient._id] - 1;
        }
      }
    },
    reorderIngredients: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const dragIngredients = state.ingredients[dragIndex];

      state.ingredients.splice(dragIndex, 1);
      state.ingredients.splice(hoverIndex, 0, dragIngredients);
    },
    clearConstructorList: (state) => {
      state.bun = initialState.bun;
      state.ingredients = initialState.ingredients;
      state.counters = initialState.counters;
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  reorderIngredients,
  clearConstructorList,
} = constructorSlice.actions;

export default constructorSlice.reducer;
