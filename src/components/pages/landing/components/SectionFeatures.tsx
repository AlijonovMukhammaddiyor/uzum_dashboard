import Image, { StaticImageData } from 'next/image';
import React from 'react';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

import clsxm from '@/lib/clsxm';

import demoImage from '@/assets/feature.png';

// Niche selection
// Product analysis
// Trends and seasonality
// Category Analysis
// Price segmentation
// Seller and brand analysis
// Sales Tops
// Lost revenue
// Filter New
// Daily reporting
// Card Product
// History of card changes
// Period Comparison
// Search for similar products
// Ad bid check
// Rating of brands and suppliers
// Group reports
// Plugin for Chrome
// History of ad campaigns and competitor bids

const externalAnalytics: {
  title: string;
  image: StaticImageData;
  description?: string; // add description to each one later
}[] = [
  {
    title: 'Nish tanlash',
    image: demoImage,
    description: 'Bozorga kirishdan oldin eng istiqbolli nishlarni aniqlash',
  },
  {
    title: 'Mahsulotlar analitikasi',
    image: demoImage,
  },
  {
    title: 'So`nggi trendlar',
    image: demoImage,
  },
  {
    title: 'Kategoriyalar analitikasi',
    image: demoImage,
  },
  {
    title: 'Narx segmentatsiyasi',
    image: demoImage,
  },
  {
    title: 'Do`konlar analitikasi',
    image: demoImage,
  },
  {
    title: 'Kunlik hisobotlar',
    image: demoImage,
  },
  {
    // period comparison
    title: 'Davrlarni solishtirish',
    image: demoImage,
  },
  {
    title: 'O`xshash mahsulotlar',
    image: demoImage,
  },
];

const internalAnalytics: {
  title: string;
  image: StaticImageData;
  description?: string; // add description to each one later
}[] = [
  {
    title: 'Mahsulotlar tahlili',
    image: demoImage,
  },
  {
    title: 'Do`kon tahlili',
    image: demoImage,
  },
  {
    title: 'Reklama tahlili',
    image: demoImage,
  },
];

const compareAnalytics: {
  title: string;
  image: StaticImageData;
  description?: string; // add description to each one later
}[] = [
  {
    title: 'Mahsulotlar Taqqoslash',
    image: demoImage,
  },
  {
    title: 'Kategoriyalarni Taqqoslash',
    image: demoImage,
  },
  {
    title: 'Do`konlarni Taqqoslash',
    image: demoImage,
  },
];

const studio: {
  title: string;
  image: StaticImageData;
  description?: string; // add description to each one later
}[] = [
  {
    title: 'Banner dizayn',
    image: demoImage,
  },
];

function SectionFeatures() {
  const [activeTab, setActiveTab] = React.useState<string>('Nish tanlash');
  const [currentImage, setCurrentImage] =
    React.useState<StaticImageData>(demoImage);
  const [isShown, setIsShown] = React.useState<boolean>(false);
  return (
    <div className='relative w-full py-14 md:py-28'>
      <div className='layout'>
        {!isShown && (
          <div
            onClick={() => setIsShown(true)}
            className=' absolute left-5 top-5 flex items-center justify-center  p-2 md:hidden'
          >
            <MdKeyboardDoubleArrowRight className='arrow_pulse z-10 text-3xl' />
          </div>
        )}
        {/* <h1 className='text-[40px]'>Imkoniyatlar</h1> */}
        <div className='relative flex w-full items-start justify-start gap-20'>
          <div
            className={`${
              isShown ? '' : '-ml-[100%] md:ml-0'
            } four-sided-shadow z-10  w-full rounded-xl  bg-white  py-10 pl-4 transition-all sm:w-[300px] md:bg-transparent md:shadow-none`}
          >
            <div className='flex flex-col items-start justify-start gap-6'>
              <ul className='flex flex-col'>
                <li>
                  <h3 className=''>Tashqi analitika</h3>
                </li>
                {externalAnalytics.map((item, index) => (
                  <ListItem
                    {...item}
                    key={index}
                    setActiveTab={setActiveTab}
                    setCurrentImage={setCurrentImage}
                    setIsShown={setIsShown}
                    activeTab={activeTab}
                  />
                ))}
              </ul>
              <ul>
                <li>
                  <h3 className=''>Inchki analitika</h3>
                </li>
                {internalAnalytics.map((item, index) => (
                  <ListItem
                    {...item}
                    key={index}
                    setActiveTab={setActiveTab}
                    setCurrentImage={setCurrentImage}
                    setIsShown={setIsShown}
                    activeTab={activeTab}
                  />
                ))}
              </ul>

              <ul>
                <li>
                  <h3 className=''>Taqqoslash</h3>
                </li>
                {compareAnalytics.map((item, index) => (
                  <ListItem
                    {...item}
                    key={index}
                    setActiveTab={setActiveTab}
                    setCurrentImage={setCurrentImage}
                    setIsShown={setIsShown}
                    activeTab={activeTab}
                  />
                ))}
              </ul>

              <ul>
                <li>
                  <h3 className=''>Studio</h3>
                </li>
                {studio.map((item, index) => (
                  <ListItem
                    {...item}
                    key={index}
                    setActiveTab={setActiveTab}
                    setCurrentImage={setCurrentImage}
                    setIsShown={setIsShown}
                    activeTab={activeTab}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className='four-sided-shadow absolute top-10   flex-1  flex-col items-start justify-start rounded-lg px-6 py-16 md:static md:flex'>
            <h2 className='mb-4'>
              {/* Bu xizmat nima qilishi mumkin? */}
              {activeTab}
            </h2>
            <div className='flex w-full flex-col gap-3'>
              <p className='mb-2'>
                Bozorga kirishdan oldin eng istiqbolli nishlarni aniqlash
              </p>
              <Image
                src={currentImage}
                alt='demo'
                className='w-full object-contain'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListItem({
  title,
  image,
  setCurrentImage,
  setActiveTab,
  setIsShown,
  activeTab,
}: {
  title: string;
  image: StaticImageData;
  setCurrentImage: React.Dispatch<React.SetStateAction<StaticImageData>>;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: string;
}) {
  return (
    <li
      className={clsxm(
        'relative flex w-[270px] cursor-pointer items-center gap-4 bg-transparent px-6 py-2',
        activeTab === title && 'bg-primary list_link rounded-l-md text-white'
      )}
      onClick={() => {
        setCurrentImage(image);
        setActiveTab(title);
        setIsShown(false);
      }}
    >
      <span>{title}</span>
    </li>
  );
}

export default SectionFeatures;
