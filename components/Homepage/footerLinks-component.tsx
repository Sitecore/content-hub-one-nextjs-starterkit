import stylesHp from '../../styles/Homepage/Footer.module.css'
import Menu, { MenuResults } from '../../types/Homepage/menu-type';
import Image from 'next/image'
import Link from 'next/link';

type Props = {
    menuResults: MenuResults;
}

const FooterLinksComponent = ({menuResults}: Props) => {
    return(
        <div className={stylesHp.FooterLinks}>
            {menuResults.results.map((menu: Menu) => (
                <Link href={menu.link} className={stylesHp.FooterLinksItem}>
                    <Image
                        src="https://mms-delivery.sitecorecloud.io/api/media/v2/delivery/df4c80ea-db67-49f8-bcd3-08daadeee4f5/bb948e6968364176a605cfb1cba17a4d?width=300&fit=scale-down&transform=true"
                        alt=""
                        width={300}
                        height={65}
                        className={stylesHp.Logo}
                    />
                </Link>
              
            ))}
        </div>
        
    )
}

export default FooterLinksComponent