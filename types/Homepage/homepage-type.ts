import { MediaResults } from "../Common/media-type"
import { RecipeResults } from "../Recipes/recipe-type"
import { FooterResults } from "./footer-type"
import { HeaderResults } from "./header-type"


type Homepage = {
    id: string
    name: string
    header: HeaderResults
    heroBanner : MediaResults
    recipeTitle: string
    recipeSectionText: string
    recipes: RecipeResults
    footer: FooterResults
  }
export default Homepage

export type HomepageResults = {
  total: string;
  results: Homepage[];
}