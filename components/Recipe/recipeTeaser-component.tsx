import stylesHp from '../../styles/Homepage/Homepage.module.css'
import Recipe,{RecipeResults} from "../../types/Recipes/recipe-type";
import Link from 'next/link'

type Props = {
    allRecipes: RecipeResults;
}
const RecipeTeaserComponent = ({allRecipes}:Props) => {
    const recipes = allRecipes.results;
    
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
            {recipes.map((recipe: any) => (
                <div className={stylesHp.boxOuter}>
                    <div className={stylesHp.box}>
                        <img src={recipe.ImageList.results[0].fileUrl}/>
                        <h2>{recipe.Title}</h2>
                        <p className={stylesHp.boxText}>
                            {recipe.Description}
                        </p>
                        <p>
                            <button className={stylesHp.button}>
                            <Link href={`/recipes/${encodeURIComponent(recipe.id)}`}>Read more</Link>
                            </button>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RecipeTeaserComponent