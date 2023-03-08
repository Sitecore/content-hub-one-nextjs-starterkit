import stylesHp from '../../styles/Homepage/Homepage.module.css'
import {RecipeResults} from "../../types/Recipe/recipe-type";
import Link from 'next/link'
import Image from 'next/image'

type Props = {
    allRecipes: RecipeResults;
}
const RecipeTeaserComponent = ({allRecipes}:Props) => {
    const recipes = allRecipes.results;
    
    return(
        <div>
            {recipes.map((recipe: any) => (
                <div key={recipe.id} className={stylesHp.boxOuter}>
                    <div className={stylesHp.box}>
                        <Image 
                            alt=''
                            src={recipe.ImageList.results[0].fileUrl}
                            width='500'
                            height= '500'
                            className={stylesHp.boxImage}
                        />
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