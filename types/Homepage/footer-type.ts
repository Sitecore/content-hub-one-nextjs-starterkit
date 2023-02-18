import { Media } from "../Common/media-type"
import { MenuResults } from "./menu-type"

type Footer = {
    id: string
    name: string
    menuItems: MenuResults
    footerText: string
  }
export default Footer

export type FooterResults = {
  total: string;
  results: Footer[];
}