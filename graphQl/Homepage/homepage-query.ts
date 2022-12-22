import MEDIA_QUERY from "../Common/media-query";

export const ALL_HOMEPAGE_QUERY = `{ 
  data: allHomepage {
    results{
      id
      name
      heroBanner {
        results{
          ${MEDIA_QUERY}
        }
      }
      header {
        total
        results {
          __typename
        	... on Header {
						id
            name
            logo {
              total
            	results {
                ${MEDIA_QUERY}
              }
          	}
          	menuItems {
            	total
            	results {
              	__typename
              	... on Menu {
                  id
                  name
                  label
                  link
                }
            	}
            }
          }
        }
      }
      recipeTitle
      recipeSectionText
      recipes {
        total
        results {
          __typename
          ... on Recipe {
            id
            name
            Title: recipeTitle
            Ingredients: ingredients
            Duration: minutesToPrepare
            Description: preparationDescription
            ImageList: image{
              total
              results{
                ${MEDIA_QUERY}
              }
            }
          }
        }
        
      }
      footer {
        total
        results {
          __typename
          ... on Footer {
            id
            name
            menuItems {
            	total
            	results {
              	__typename
              	... on Menu {
                  id
                  name
                  label
                  link
                }
              }
            }
          } 
        }
      }
    }
  }
}
`;

export default ALL_HOMEPAGE_QUERY


