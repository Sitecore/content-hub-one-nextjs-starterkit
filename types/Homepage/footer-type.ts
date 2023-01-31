import { MenuResults } from "./menu-type"

type Footer = {
    id: string
    name: string
    menuItems: MenuResults
  }
export default Footer

export type FooterResults = {
  total: string;
  results: Footer[];
}