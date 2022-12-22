import styles from '../styles/Home.module.css'
import Header, {HeaderResults} from '../../types/Homepage/header-type'
import Menu, { MenuResults } from '../../types/Homepage/menu-type';
import stylesHp from '../../styles/Homepage/Homepage.module.css';


type Props = {
    menuResults: MenuResults;
}

const NavigationComponent = ({menuResults}: Props) => {
    return(
        <div className={stylesHp.Navigation}>
          {menuResults.results.map((menu: Menu) => (
            <a href={menu.link}>
              <span className='NavigationItem'>
                {menu.label}
              </span>
            </a>
          ))}
        </div>
        
    )
}

export default NavigationComponent