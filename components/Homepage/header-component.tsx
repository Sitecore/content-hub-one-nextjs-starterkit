import {HeaderResults} from '../../types/Homepage/header-type'
import stylesHp from '../../styles/Homepage/Homepage.module.css';
import NavigationComponent from './navigation-component';
import Image from 'next/image';
import Link from 'next/link';


type Props = {
    allHeaders: HeaderResults;
}

const HeaderComponent = ({allHeaders}: Props) => {
    const header = allHeaders.results[0];
    return(
        <div>
            <div className={stylesHp.header}>
                <div className={stylesHp.boxedContainer} >
                    <Link href="https://doc.sitecore.com/ch-one/" target="_blank">
                        <Image 
                            alt=''
                            src={header?.logo?.results[0]?.fileUrl}
                            width={24}
                            height={24}
                            className={stylesHp.Logo}
                        />
                    </Link>
                    <NavigationComponent 
                        menuResults  = {header?.menuItems}
                    />
                </div>
                
            </div>
            
        </div>
        
    )
}

export default HeaderComponent