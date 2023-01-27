import Recipe, {RecipeResults} from "../../types/Recipe/recipe-type";
import {fetchAPI} from "../Common/api"
import {RECIPE_QUERY,ALL_RECIPE_QUERY} from "../../graphQl/Recipe/recipe-query";


export async function getAllRecipes(preview: boolean): Promise<Recipe[]> {
    const data = await fetchAPI(`${ALL_RECIPE_QUERY}`);
    
    return extractPosts(data.data);
}

export async function getRecipeById(id: string): Promise<Recipe> {

  const queryRecipe = `{ 
    data: recipe(id: "${id}")
    {
        ${RECIPE_QUERY}
    }
  }`;
  
  const data = await fetchAPI(queryRecipe);
  return data.data.data;
}

export async function getAllRecipeWithIds(): Promise<Recipe[]> {
  const  query = `{ 
    data: allRecipe
    {
      __typename
      total
      results {
        ${RECIPE_QUERY}
      }
    }
  }`;

  const data = await fetchAPI(query);
   return extractPosts(data.data);
}

function extractPosts({ data }: { data: RecipeResults }) {

    return data.results.map((post: Recipe) => {
      return post;
    });
}

function extractPost({ data }: { data: Recipe }) {
  return data;
}


