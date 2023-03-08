import MEDIA_QUERY from "../Common/media-query";

export const MENU_QUERY = 
` 
id
name
label
link
menuImage {
    results {
        ${MEDIA_QUERY}
    }
}
    `;
export default MENU_QUERY;