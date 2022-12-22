import stylesHp from '../../styles/Homepage/Homepage.module.css'
import Header, {HeaderResults} from '../../types/Homepage/header-type'
import Menu, { MenuResults } from '../../types/Homepage/menu-type';

type Props = {
    menuResults: MenuResults;
}

const FooterLinksComponent = ({menuResults}: Props) => {
    return(
        <div className={stylesHp.FooterLinks}>
            {menuResults.results.map((menu: Menu) => (
              <a className={stylesHp.FooterLinksItem}href={menu.link}>
               <img className={stylesHp.Logo} src="https://mms-delivery.sitecorecloud.io/api/media/v2/delivery/df4c80ea-db67-49f8-bcd3-08daadeee4f5/bb948e6968364176a605cfb1cba17a4d?width=300&fit=scale-down&transform=true"/>
              </a>
            ))}
        </div>
        
    )
}

export default FooterLinksComponent