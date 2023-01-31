import styles from '../../styles/Homepage/Footer.module.css'
import {FooterResults} from '../../types/Homepage/footer-type'
import FooterLinksComponent from './footerLinks-component';


type Props = {
    allFooters: FooterResults;
}

const FooterComponent = ({allFooters}: Props) => {
    const footer = allFooters.results[0];
    return(
        <footer className={styles.footer}>
            <div className={styles.footerBox}>
                <p>
                Further Information: {' '}
                </p>
                <FooterLinksComponent 
                    menuResults  = {footer.menuItems}
                />
                
            </div>
        </footer>
        
    )
}

export default FooterComponent