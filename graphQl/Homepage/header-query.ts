import MENU_QUERY from "./menu-query";
import MEDIA_QUERY from "../Common/media-query";

export const ALL_HEADER_QUERY = `{ 
    data: allHeader {
        total
        results {
          id
          name
          heroImage {
                    total
              results {
                $(MEDIA_QUERY)
            }
          }
          logo {
              total
            results {
                $(MEDIA_QUERY)
            }
          }
          menuItems {
            total
            results {
              __typename
              ... on Menu {
                $(MENU_QUERY)
              }
            }
            
          }
        }
      }
  `;

export default ALL_HEADER_QUERY