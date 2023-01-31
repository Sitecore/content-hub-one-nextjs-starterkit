type Menu = {
    id: string
    name: string
    label: string
    link: string 
  }
export default Menu

export type MenuResults = {
  total: string;
  results: Menu[];
}