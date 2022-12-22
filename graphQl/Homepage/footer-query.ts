import MENU_QUERY from "./menu-query";

export const ALL_FOOTER_QUERY = `{ 
    data: allFooter {
        results {
          id
          name
          menuItems {
            total
            results {
              __typename
              ... on Menu {
                ${MENU_QUERY}
              }
            }
          }
         }    
      }
  `;

export default ALL_FOOTER_QUERY