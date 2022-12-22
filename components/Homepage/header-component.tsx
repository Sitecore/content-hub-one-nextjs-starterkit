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
                    <img className={stylesHp.Logo} src={header.logo.results[0].fileUrl}/>
                    
                    <NavigationComponent 
                        menuResults  = {header.menuItems}
                    />
                </div>
                
            </div>
            
        </div>
        
    )
}

export default HeaderComponent