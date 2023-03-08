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
                <Link key={menu.id} href={menu.link} className={stylesHp.FooterLinksItem}>
                    <Image
                        src={menu?.menuImage?.results[0]?.fileUrl}
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