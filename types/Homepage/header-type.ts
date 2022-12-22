import {MediaResults} from "../Common/media-type" 
import { MenuResults } from "./menu-type"

type Header = {
    id: string
    name: string
    logo: MediaResults
    menuItems: MenuResults
  }
export default Header

export type HeaderResults = {
  total: string;
  results: Header[];
}