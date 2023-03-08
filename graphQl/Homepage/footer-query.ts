import MENU_QUERY from "./menu-query";

export const FOOTER_QUERY = `
  id
  name
  footerText
  menuItems {
    total
    results {
      __typename
      ... on Menu {
        ${MENU_QUERY}
      }
    }
  }
`;

export const ALL_FOOTER_QUERY = `{ 
    data: allFooter {
        results {
            ${FOOTER_QUERY}
         }    
      }
  `;

export default ALL_FOOTER_QUERY