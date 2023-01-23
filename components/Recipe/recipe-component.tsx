import styles from '../../styles/Homepage/Homepage.module.css'
import Recipe,{RecipeResults} from "../../types/Recipe/recipe-type";
type Props = {
    allRecipes: RecipeResults;
}

const RecipeComponent = ({allRecipes}:Props) => {
    const recipes = allRecipes;
    return(
        <div>
            <style jsx>{`
                    .button{
                        padding: 10px;
                        border-radius: 15px;
                        border-color: #eaeaea;
                        background-color: blueviolet;
                        color: white;
                      }

                `} 
            </style>   
            {recipes.results.map((recipe: any) => (
            <a href="https://nextjs.org/docs" className={styles.card}>
                <h2>{recipe.recipeTitle} &rarr;</h2>
                <p>
                    ({recipe.id})
                    <img width="100%" src={recipe.ImageList.results[0].fileUrl}/> <br/>
                    Name: {name}<br/>
                    Ingredients: {recipe.ingredients}<br/>
                    Duration: {recipe.minutesToPrepare} min.<br/>
                    Description: {recipe.preparationDescription}<br/>
                    
                </p>
            </a>
            ))}
        </div>
    )
}

export default RecipeComponent