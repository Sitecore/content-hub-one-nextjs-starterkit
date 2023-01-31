import stylesHp from '../../styles/Homepage/HeroBanner.module.css'
import Image from 'next/image'

type Props = {
    heroImageUrl: string;
    altText: string;
}

const HeroBanner = ({heroImageUrl,altText}:Props) => {
    
    return(
        <div className={stylesHp.HeroImage}>
          <Image 
            alt={altText}
            src={heroImageUrl}
            width={2000}
            height= {520}
          />
        </div>
    )
}

export default HeroBanner