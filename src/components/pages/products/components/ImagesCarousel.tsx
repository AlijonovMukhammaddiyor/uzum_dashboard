import Image from 'next/image';
import React, { useRef } from 'react';
import { BsCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';

export interface ImagesCarouselProps {
  images: string[]; // image urls
}

function ImagesCarousel({ images }: ImagesCarouselProps) {
  const [activeImage, setActiveImage] = React.useState<number>(0);
  const imageRefs = useRef<HTMLDivElement | null>(null);

  const moveLeft = () => {
    let index = activeImage;

    if (activeImage === 0) {
      setActiveImage(images.length - 1);
      index = images.length - 1;
    } else {
      setActiveImage(activeImage - 1);
      index = activeImage - 1;
    }
    if (imageRefs.current) {
      // based on index, make sure the image is in the middle
      imageRefs.current.scrollLeft = index * 100;
      // add smooth scoll
      imageRefs.current.style.scrollBehavior = 'smooth';
    }
  };

  const moveRight = () => {
    let index = activeImage;
    if (activeImage === images.length - 1) {
      setActiveImage(0);
      index = 0;
    } else {
      setActiveImage(activeImage + 1);
      index = activeImage + 1;
    }
    if (imageRefs.current) {
      // based on index, make sure the image is in the middle
      imageRefs.current.scrollLeft = index * 100;
      // add smooth scoll
      imageRefs.current.style.scrollBehavior = 'smooth';
    }
  };

  return (
    <div className='relative flex h-[200px] w-full max-w-full items-center justify-center'>
      <BsCaretLeftFill
        onClick={moveLeft}
        className='text-primary z-10 h-6 w-6 flex-shrink-0 cursor-pointer'
      />
      <div
        className='flex h-full w-[450px] shrink-0 items-center justify-between gap-3 overflow-hidden'
        ref={imageRefs}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`h-[100px] w-[100px] shrink-0 transition-transform duration-500 ${
              activeImage === index
                ? 'scale-[1.2] transform'
                : 'scale-90 transform'
            }`}
          >
            <Image
              src={image}
              alt=''
              layout='fill'
              objectFit='cover'
              className='h-full w-full shrink-0 select-none object-cover transition-opacity duration-500'
              style={{ opacity: activeImage === index ? 1 : 0.5 }}
            />
          </div>
        ))}
      </div>

      <BsFillCaretRightFill
        onClick={() => {
          moveRight();
        }}
        className='text-primary h-6 w-6 flex-shrink-0 cursor-pointer'
      />
    </div>
  );
}

export default ImagesCarousel;
