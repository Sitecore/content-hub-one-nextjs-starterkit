import styles from '../../styles/Homepage/Home.module.css'
type Props = {
    recipeTitle: string
    id: string
    name: string
    ingredients: string
    minutesToPrepare: string
    preparationDescription: string
    image: string
}

const RecipeComponent = ({
    recipeTitle,
    id,
    name,
    ingredients,
    minutesToPrepare,
    preparationDescription,
    image,
}: Props) => {
    return(
        
        <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>{recipeTitle} &rarr;</h2>
            <p>
                ({id})
                <img width="100%" src={image}/> <br/>
                Name: {name}<br/>
                Ingredients: {ingredients}<br/>
                Duration: {minutesToPrepare} min.<br/>
                Description: {preparationDescription}<br/>
                
            </p>
          </a>
        
    )
}

export default RecipeComponent