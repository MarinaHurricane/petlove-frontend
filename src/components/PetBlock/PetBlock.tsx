import css from './PetBlock.module.css';

type PetBlockImages = {
  mobile1x: string;
  mobile2x: string;
  tablet1x: string;
  tablet2x: string;
  desktop1x: string;
  desktop2x: string;
};

type PetBlockProps = {
  images: PetBlockImages;
  alt: string;
};

export const PetBlock = ({images, alt}: PetBlockProps) => {
    return (
        <div className={css.petBlock}>
            <picture>
                <source 
                media="(min-width: 1280px)"
                srcSet={`${images.desktop1x} 1x, ${images.desktop2x} 2x`}
                />

                <source 
                media="(min-width:768px)"
                srcSet={`${images.tablet1x} 1x, ${images.tablet2x} 2x`}
                />

                <img 
                className={css.image}
                src={images.mobile1x}
                srcSet={`${images.mobile1x} 1x, ${images.mobile2x} 2x`}
                alt={alt} />
            </picture>
        </div>
    )
}