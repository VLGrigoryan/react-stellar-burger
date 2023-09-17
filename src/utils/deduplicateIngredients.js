  export const deduplicateIngredients = (arr) => {
    const deduplicated = [];
  
    arr.forEach((elem) => {
      const existingIngredient = deduplicated.find((item) => item._id === elem._id);
  
      if (existingIngredient) {
        existingIngredient.__v += 1;
      } else {
        deduplicated.push(elem);
      }
    });
  
    return deduplicated;
  };