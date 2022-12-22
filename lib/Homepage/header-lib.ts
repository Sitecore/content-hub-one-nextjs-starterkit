import Header, {HeaderResults} from "../../types/Homepage/header-type";
import {fetchAPI} from "../api"
import {ALL_HEADER_QUERY} from "../../graphQl/Homepage/header-query";


export async function getAllHeader(preview: boolean): Promise<Header[]> {
    const data = await fetchAPI(`${ALL_HEADER_QUERY}`);
    
    return extractPosts(data.data);
}


function extractPosts({ data }: { data: HeaderResults }) {
    console.log(data);
    return data.results.map((post: Header) => {
      return post;
    });
}
