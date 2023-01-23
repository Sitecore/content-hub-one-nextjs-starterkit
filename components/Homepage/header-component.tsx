import { getAllHeader } from '../../lib/Homepage/header-lib';
import Header, {HeaderResults} from '../../types/Homepage/header-type'
import stylesHp from '../../styles/Homepage/Homepage.module.css';
import NavigationComponent from './navigation-component';


type Props = {
    allHeaders: HeaderResults;
}

const HeaderComponent = ({allHeaders}: Props) => {
    const header = allHeaders.results[0];
    return(
        <div>
            <div className={stylesHp.header}>
                <div className={stylesHp.boxedContainer} >
                    <a href="https://doc.sitecore.com/ch-one/" target="_blank">
                        <img className={stylesHp.Logo} src={header.logo.results[0].fileUrl}/>
                    </a>
                    <NavigationComponent 
                        menuResults  = {header.menuItems}
                    />
                </div>
                
            </div>
            
        </div>
        
    )
}

export default HeaderComponent