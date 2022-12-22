import Homepage, {HomepageResults} from "../../types/Homepage/homepage-type";
import {fetchAPI} from "../Common/api"
import {ALL_HOMEPAGE_QUERY} from "../../graphQl/Homepage/homepage-query";


export async function getAllHomepage(preview: boolean): Promise<Homepage[]> {
    const data = await fetchAPI(`${ALL_HOMEPAGE_QUERY}`);
    
    return extractPosts(data.data);
}


function extractPosts({ data }: { data: HomepageResults  }) {
    console.log(data);
    return data.results.map((post: Homepage) => {
      return post;
    });
}
