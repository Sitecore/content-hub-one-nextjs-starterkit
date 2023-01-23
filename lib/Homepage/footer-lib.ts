import Footer, {FooterResults} from "../../types/Homepage/footer-type";
import {fetchAPI} from "../Common/api"
import {ALL_FOOTER_QUERY} from "../../graphQl/Homepage/footer-query";


export async function getAllFooter(preview: boolean): Promise<Footer[]> {
    const data = await fetchAPI(`${ALL_FOOTER_QUERY}`);
    
    return extractPosts(data.data);
}


function extractPosts({ data }: { data: FooterResults }) {
    return data.results.map((post: Footer) => {
      return post;
    });
}
