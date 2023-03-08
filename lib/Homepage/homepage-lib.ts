import Homepage, {HomepageResults} from "../../types/Homepage/homepage-type";
import {fetchAPI} from "../Common/api"
import {ALL_HOMEPAGE_QUERY,HOMEPAGE_QUERY} from "../../graphQl/Homepage/homepage-query";


export async function getAllHomepage(preview: boolean): Promise<Homepage[]> {

    //console.log(ALL_HOMEPAGE_QUERY);
    const data = await fetchAPI(`${ALL_HOMEPAGE_QUERY}`);
    //console.log(data);
    return extractPosts(data.data);
}

export async function getHomepageById(id: string): Promise<Homepage> {
  
  const queryHomepage = `{ 
    data: homepage(id: "${id}")
    {
        ${HOMEPAGE_QUERY}
    }
  }`;

  const data = await fetchAPI(queryHomepage);
  return data.data.data;
  
}


function extractPosts({ data }: { data: HomepageResults  }) {
    return data.results.map((post: Homepage) => {
      return post;
    });
}
