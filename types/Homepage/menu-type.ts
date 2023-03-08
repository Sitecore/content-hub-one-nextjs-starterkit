import { Media, MediaResults } from "../Common/media-type"

type Menu = {
    id: string
    name: string
    label: string
    link: string 
    menuImage: MediaResults
  }
export default Menu

export type MenuResults = {
  total: string;
  results: Menu[];
}