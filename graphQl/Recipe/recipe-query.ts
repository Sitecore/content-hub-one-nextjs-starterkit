import MEDIA_QUERY from "../Common/media-query";

export const RECIPE_QUERY = ` 
  id
  Title: recipeTitle
  Name: name
  Ingredients: ingredients
  Duration: minutesToPrepare
  Description: preparationDescription
  ImageList: image{
    total
    results{
      ${MEDIA_QUERY}
    }
  }
`;

export const ALL_RECIPE_QUERY = `{ 
    data: allRecipe
    {
      __typename
      total
      results {
        ${RECIPE_QUERY}
      }
    }
  }
  `;

export default ALL_RECIPE_QUERY

