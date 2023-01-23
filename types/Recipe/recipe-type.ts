import {MediaResults} from "../Common/media-type" 
import { JSONContent } from "@tiptap/core";

type Recipe = {
    Title: string
    id: string
    Name: string
    Ingredients: string
    Duration: string
    Description: string
    preparationDescriptionRt: JSONContent
    ImageList: MediaResults
  }
export default Recipe

export type RecipeResults = {
  total: string;
  results: Recipe[];
}