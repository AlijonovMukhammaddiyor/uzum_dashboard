import Image, { StaticImageData } from 'next/image';
import React from 'react';
import Zoom from 'react-medium-image-zoom';

import clsxm from '@/lib/clsxm';

import demoImage from '@/assets/landing/picture.png';

const externalAnalytics: {
  title: string;
  image: StaticImageData;
  description?: string; // add description to each one later
}[] = [
  {
    title: 'Nish tanlash',
    image: demoImage,
    description:
      "Eng istiqbolli va daromadli bozor segmentini kashf qiling va o'rganing. Bu o'z kuchingiz va mablag'ingizni muvaffaqiyat uchun yuqori salohiyatga ega bo'lgan ixtisoslashgan sohalarga yo'naltirish imkonini beradi.",
  },
  {
    title: 'Mahsulotlar analitikasi',
    image: demoImage,
    description:
      'Mahuslotlarni analiz qilish va eng istiqbolli mahsulotlarni aniqlash.',
  },
  {
    title: "So'nggi trendlar",
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
    // period comparison
    title: 'Davrlarni solishtirish',
    image: demoImage,
  },
  {
    title: 'O`xshash mahsulotlar',
    image: demoImage,
  },
  {
    title: "Do'konlar va masulotlar pozitsiyasi",
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
    title: "Do'kon tahlili",
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
    title: "Do'konlarni Taqqoslash",
    image: demoImage,
  },
];

const descriptions_uz: {
  [key: string]: string;
} = {
  'Nish tanlash': `Eng istiqbolli va daromadli bozor segmentini kashf qiling va o'rganing. Bu o'z kuchingiz va mablag'ingizni muvaffaqiyat uchun yuqori salohiyatga ega bo'lgan ixtisoslashgan sohalarga yo'naltirish imkonini beradi.`,
  'Mahsulotlar analitikasi': `Keng qamrovli ma'lumotlarni tahlil qilish orqali eng istiqbolli mahsulotlarni aniqlang. Savdo ko'rsatkichlari, mijozlarning izohlari va paydo bo'layotgan tendentsiyalar haqida qimmatli ma'lumotlarga ega bo'ling. Bu sizga mahsulotlaringiz miqdorini va narxini optimallashtirishga yordam beradi.`,
  "So'nggi trendlar": `Eng so'nggi trendlar sizni doimiy ravishda o'zgarib turadigan bozor landshaftidan, rivojlanayotgan bozor tendentsiyalari xabardor qiladi. Biznes strategiyalaringizni moslashtirish, yangi imkoniyatlardan foydalanish va bozoringizning oʻzgaruvchan talablarini qondirish uchun ushbu maʼlumotlardan foydalanib, raqobatchilardan oldinda turing.`,
  'Kategoriyalar analitikasi': `Bozordagi turli xil mahsulot kategoriyalarning tendentsiyalarini o'rganish imkonini beradi. Har bir Kategoriyaning ichki strukturasi va mahsulotlarning narxlari, miqdori va boshqa ko'rsatkichlari haqida ma'lumotlarga ega bo'ling.`,
  'Narx segmentatsiyasi': `Daromadi eng yuqori bo'lgan va kam bo'lgan narx oraliqlarini aniqlang.`,
  "Do'konlar analitikasi": `Har bir doʻkonning savdo, mijozlarni jalb qilish, mahsulot turlari kabi asosiy koʻrsatkichlarni tushunib oling, bu sizga yuqori samarali doʻkonlarni aniqlash, marketing harakatlarini optimallashtirishda yordam beradi.`,
  'Davrlarni solishtirish':
    'Mahsulotlarning turli davrlardagi koʻrsatkichlarini solishtiring.',
  'O`xshash mahsulotlar': `O'xshash mahsulotlarni aniqlang va ularning solishtiring. Potensial savdo imkoniyatlarini aniqlang.`,
  "Do'konlar va masulotlar pozitsiyasi": `Bozordagi pozitsiya o'zgarishlarini kuzatib boring.`,
  'Mahsulotlar tahlili': 'Do`koningizdagi mahsulotlarni tahlil qiling.',
  "Do'kon tahlili":
    "ABC tahlil tizimidan foydalangan holda yuqori samarali mahsulotlaringizni aniqlang, ularni daromadga qo'shgan hissasi asosida strategik toifalarga ajrating va inventarizatsiya, narxlash va marketing strategiyalaringizni optimallashtirish uchun ongli qarorlar qabul qiling. Bizning keng qamrovli tahlilimiz bilan siz yuqori qiymatli mahsulotlarga e'tibor qaratishingiz mumkin.",
  'Mahsulotlar Taqqoslash':
    'Intuitiv taqqoslash vositamizdan foydalanib, ixtiyoriy ikkita mahsulotlarni osongina solishtiring. Asosli qarorlar qabul qilish uchun asosiy xususiyatlarni, narxlarni, reytingini va boshqalarni yonma-yon tahlil qiling.',
  "Do'konlarni Taqqoslash":
    "Istalgan ikkita do'konni osongina solishtiring. Mahsulot, narxlar, mijozlar sharhlari, va shu kabi asosiy ko'rsatkichlarni baholang.",
  'Kategoriyalarni Taqqoslash':
    "Keng qamrovli taqqoslash vositamizdan foydalanib, har qanday ikkita kategoriyalarni solishtiring. Mahsulot turlari, soni, narx oralig'i, savdo miqdori va shu kabi asosiy omillarni baholang.",
  'Banner dizayn':
    'Mahsulotlaringiz uchun ajoyib bannerlar yarating. Mahsulotlaringizning jozibadorligini oshiring.',
};

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
    <div className='relative w-full py-8 md:py-28' id='services'>
      <div className='layout'>
        <h1 className='font-primary text-2xl font-semibold leading-8 tracking-wider md:mb-6 md:text-[35px] md:leading-[40px] xl:text-[43px] xl:leading-[60px]'>
          Nima qilishi mumkin?
        </h1>
        {/* <h1 className='text-[40px]'>Imkoniyatlar</h1> */}
        <div className='relative flex w-full flex-col items-start justify-start gap-20 md:flex-row'>
          <div
            className={clsxm(
              'md:four-sided-shadow relative w-full bg-white pl-4 pt-7 transition-all md:z-10 md:w-[300px] md:rounded-xl  md:bg-transparent md:py-10 md:pt-10 md:shadow-none'
            )}
          >
            <div className='flex w-full flex-col items-start justify-start gap-6'>
              <ul className='flex w-full flex-col'>
                <li>
                  <h3 className='mb-2'>Tashqi analitika</h3>
                </li>
                <div className='no-scrollbar flex w-full gap-3 overflow-scroll md:flex-col md:gap-0'>
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
                </div>
              </ul>
              <ul className='flex w-full flex-col'>
                <li>
                  <h3 className='mb-2'>Inchki analitika</h3>
                </li>
                <div className='no-scrollbar flex w-full gap-3 overflow-scroll md:flex-col md:gap-0'>
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
                </div>
              </ul>

              <ul className='flex w-full flex-col'>
                <li>
                  <h3 className='mb-2'>Taqqoslash</h3>
                </li>
                <div className='no-scrollbar flex w-full gap-3 overflow-scroll md:flex-col md:gap-0'>
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
                </div>
              </ul>

              <ul className='flex w-full flex-col'>
                <li>
                  <h3 className='mb-2'>Studio</h3>
                </li>
                <div className='no-scrollbar flex w-full gap-3 overflow-scroll md:flex-col md:gap-0'>
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
                </div>
              </ul>
            </div>
          </div>
          <div className='four-sided-shadow flex-1 flex-col items-start justify-start rounded-lg px-6 py-10 pb-16 md:static md:mt-6 md:flex'>
            <h2 className='mb-4 text-[18px] lg:text-3xl'>{activeTab}</h2>
            <div className='flex w-full flex-col gap-3'>
              <p className='mb-2'>{descriptions_uz[activeTab]}</p>
              <div className='h-full w-full'>
                <Zoom>
                  <Image
                    src={currentImage}
                    alt='demo'
                    className='h-full w-full object-cover'
                  />
                </Zoom>
              </div>
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
        'px-4 py-2 md:relative md:flex md:w-[270px] md:cursor-pointer md:items-center md:gap-4',
        'min-w-max cursor-pointer rounded-3xl bg-slate-200 md:min-w-0 md:bg-transparent',
        activeTab === title &&
          'bg-primary md:bg-primary md:list_link text-white md:rounded-l-md md:rounded-r-none'
      )}
      onClick={() => {
        setCurrentImage(image);
        setActiveTab(title);
        setIsShown(false);
      }}
    >
      <span className='text-xs sm:text-base'>{title}</span>
    </li>
  );
}

export default SectionFeatures;
