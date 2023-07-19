import Image, { StaticImageData } from 'next/image';
import React from 'react';
import Zoom from 'react-medium-image-zoom';

import clsxm from '@/lib/clsxm';

import allshops from '@/assets/landing/features/allshops.png';
import categories from '@/assets/landing/features/categories.png';
import category_price_seg from '@/assets/landing/features/category_price_seg.png';
import category_products from '@/assets/landing/features/category_products.png';
import category_shops from '@/assets/landing/features/category_shops.png';
import category_subcategories from '@/assets/landing/features/category_subcategories.png';
import category_trends from '@/assets/landing/features/category_trends.png';
import growing_categories from '@/assets/landing/features/growing_categories.png';
import growing_products from '@/assets/landing/features/growing_products.png';
import home_umumiy from '@/assets/landing/features/home_umumiy.png';
import new_proucts from '@/assets/landing/features/new_products.png';
import product from '@/assets/landing/features/product.png';
import product_analytics from '@/assets/landing/features/product_analytics.png';
import product_competitors from '@/assets/landing/features/product_competitors.png';
import products from '@/assets/landing/features/products.png';
import shop_analytics from '@/assets/landing/features/shop_analytics.png';
import shop_categories from '@/assets/landing/features/shop_categories.png';
import shop_competitors from '@/assets/landing/features/shop_competitors.png';
import shop_daily from '@/assets/landing/features/shop_daily.png';
import shop_products from '@/assets/landing/features/shop_products.png';
import similars from '@/assets/landing/features/similars.png';

const UmumiyAnalytics: {
  title: string;
  image: StaticImageData;
  description?: string; // add description to each one later
}[] = [
  {
    title: 'Umumiy',
    image: home_umumiy,
    description:
      "Eng istiqbolli va daromadli bozor segmentini kashf qiling va o'rganing. Bu o'z kuchingiz va mablag'ingizni muvaffaqiyat uchun yuqori salohiyatga ega bo'lgan ixtisoslashgan sohalarga yo'naltirish imkonini beradi.",
  },
  {
    title: 'Yangi mahsulotlar',
    image: new_proucts,
    description:
      'Mahuslotlarni analiz qilish va eng istiqbolli mahsulotlarni aniqlash.',
  },
  {
    title: "O'sayotgan mahsulotlar",
    image: growing_products,
  },
  {
    title: "O'sayotgan kategoriyalar",
    image: growing_categories,
  },
];

const CategoryAnalytics: {
  title: string;
  image: StaticImageData;
  description?: string; // add description to each one later
}[] = [
  {
    title: 'Barcha kategoriyalar',
    image: categories,
    description:
      "Eng istiqbolli va daromadli bozor segmentini kashf qiling va o'rganing. Bu o'z kuchingiz va mablag'ingizni muvaffaqiyat uchun yuqori salohiyatga ega bo'lgan ixtisoslashgan sohalarga yo'naltirish imkonini beradi.",
  },
  {
    title: 'Kategoriya trendi',
    image: category_trends,
    description:
      'Mahuslotlarni analiz qilish va eng istiqbolli mahsulotlarni aniqlash.',
  },
  {
    title: 'Kategoriya mahsulotlari',
    image: category_products,
  },
  {
    title: 'Ichki kategoriyalar',
    image: category_subcategories,
  },
  {
    title: 'Narx segmentatsiyasi',
    image: category_price_seg,
  },
  {
    title: "Kategoriya do'konlari",
    image: category_shops,
  },
];

const ShopAnalytics: {
  title: string;
  image: StaticImageData;
  description?: string; // add description to each one later
}[] = [
  {
    title: "Barcha do'konlar",
    image: allshops,
    description:
      "Eng istiqbolli va daromadli bozor segmentini kashf qiling va o'rganing. Bu o'z kuchingiz va mablag'ingizni muvaffaqiyat uchun yuqori salohiyatga ega bo'lgan ixtisoslashgan sohalarga yo'naltirish imkonini beradi.",
  },
  {
    title: "Do'kon tahlili",
    image: shop_analytics,
    description:
      'Mahuslotlarni analiz qilish va eng istiqbolli mahsulotlarni aniqlash.',
  },
  {
    title: "Do'kon mahsulotlari",
    image: shop_products,
  },
  {
    title: "Do'kon kategoriyalari",
    image: shop_categories,
  },
  {
    title: "Do'kon raqobatchilari",
    image: shop_competitors,
  },
  {
    title: "Do'kon kunlik sotuvlari",
    image: shop_daily,
  },
];

const ProductAnalytics: {
  title: string;
  image: StaticImageData;
  description?: string; // add description to each one later
}[] = [
  {
    title: 'Barcha mahsulotlar',
    image: products,
  },
  {
    title: 'Mahsulot haqida',
    image: product,
  },
  {
    title: 'Mahsulot tahlili',
    image: product_analytics,
  },
  {
    title: 'Mahsulot raqobatchilari',
    image: similars,
  },
  {
    title: 'Raqobatchilarini taqqoslash',
    image: product_competitors,
  },
];

const descriptions_uz: {
  [key: string]: string;
} = {
  Umumiy: `Uzum bozorining kunlik yangiliklari, barcha mahsulotlar, do'konlar va buyurtmalar haqida to'liq ma'lumotga ega bo'ling. Bozor o'zgarishlarini osonlik bilan kuzatib boring.`,
  'Yangi mahsulotlar': `Bozorga yangi sotuvga chiqqan mahsulotlarni va ularning turlarini tahlil qiling.`,
  "O'sayotgan mahsulotlar": `Bu xizmat orqali eng ko'p o'sib borayotgan mahsulotlar haqida ma'lumot bilib turing, bu esa sizga qaysi mahsulotlar ommalashib borayotganini tushunish imkonini beradi. `,
  "O'sayotgan kategoriyalar": `Bu qaysi kategoriyalar o'sib borayotganini ko'rsatadi, va sizga trend bo'lgan tarmoqlarni aniqlashga va o'z investitsiyalaringizni shunga mos ravishda yo'naltirishga yordam beradi.`,
  'Barcha kategoriyalar':
    "Bu orqali siz barcha mavjud kategoriyalarni hamda ularning ichki kategoriyalarini ko'rishingiz mumkin.",
  "Kategoriya do'konlari": `Bu xususiyat ma'lum bir ategoriyadagi mahsulotlarni sotadigan barcha do'konlar haqida ma'lumot beradi va sizga potentsial raqobatchilarni aniqlashga yordam beradi.`,
  'Kategoriya mahsulotlari':
    "Bu kategoriyadagi barcha mahsulotlarning batafsil ro'yxatini va ular haqidagi analitik ma'limotlarni taqdim etadi, bu inventarizatsiyani yaxshiroq boshqarish va strategiyani shakllantirishnga yordam beradi.",
  'Kategoriya trendi': `Kategoriyadagi mahsulotlar soni, narxi, daromadi va shu kabi asosiy ko'rsatkichlarni bilib oling. Bu sizga kategoriyalarni solishtirish va kategoriyalarni tanlashda yordam beradi.`,
  'Ichki kategoriyalar': `Kategoriyadagi ichki kategoriyalarni ko'ring. Bu sizga kategoriya ichidagi mahsulot ierarxiyasi va segmentatsiyasini tushunishda yordam beradi`,
  'Narx segmentatsiyasi':
    "Bu har bir toifadagi narxlar va shu narxlar oralig'idagi buyurtmalar segmentatsiyasini ko'rsatadi va sizga raqobatli yoki eng foydali narxl oralig'larini topishga va raqobatbardosh narxlarni belgilashda yordam beradi.",
  "Barcha do'konlar":
    "Platformadagi barcha do'konlarning batafsil jadvali, raqobatbardosh landshaftning yaxlit ko'rinishini taklif qiladi.",
  "Do'kon tahlili":
    "Bu individual do'konlarning savdo ma'lumotlari va mahsulot assortimentlarini chuqur tahlil qiladi va biznesga muvaffaqiyatli strategiyalarni aniqlashda yordam beradi.",
  "Do'kon kunlik sotuvlari":
    "Bu xususiyat do'konning kundalik savdo ma'lumotlarini taqdim etadi, bu esa kundalik savdo tendentsiyalarini tahlil qilishga yordam beradi.",
  "Do'kon raqobatchilari":
    "U ma'lum bir do'konning raqobatchilarini ta'kidlab, strategik raqobat va ajralib turish uchun tushuncha beradi.",
  "Do'kon kategoriyalari":
    "Bu xususiyat ma'lum bir do'kon tomonidan qaysi toifalar mahsulotlar sotilayotganini ko'rsatadi, sotuvchilarga mahsulot assortimentini diversifikatsiya qilish yoki yo'naltirishda yordam beradi. Shuningdek, do'konning kategoriyalarini solishtirishda va mablag'ni yo'naltirishda yordam beradi.",
  'Barcha mahsulotlar':
    "Bu xususiyat platformadagi barcha mahsulotlar haqida to'liq ma'lumot beradi va bozorda mavjud bo'lgan narsalar haqida keng tushuncha beradi.",
  'Mahsulot haqida':
    "Bu ma'lum bir mahsulot haqida batafsil ma'lumotni, jumladan uning narxi, reytingi va sotuvchi tafsilotlarini taqdim etadi va iste'molchilar va raqobatchilar uchun qimmatli tushunchalarni beradi.",
  'Mahsulot tahlili':
    "Bu mahsulotni chuqur tahlil qilib, sotuvchilarga mahsulotning ishlashi va sotuv tendetsiyalari hamda narx va raqobatning mahsulot sotuviga ta'sirini tushunishda yordam beradi.",
  'Mahsulot raqobatchilari':
    "Bu xususiyat ma'lum bir mahsulotning raqobatchilarini ta'kidlab, sizga mahsulotlaringiz raqobatchilarga qanday qarshilik ko'rsatishini tushunishga imkon beradi.",
  'Raqobatchilarini taqqoslash':
    "Bu mahsulotni raqobatchilari bilan narx, reyting, sotuv miqdori va boshqalar kabi turli parametrlar bo'yicha taqqoslash imkonini beradi, bu esa sizga o'z takliflaringizni va narx strategiyalaringizni yaxshilashda yordam beradi.",
};

function SectionFeatures() {
  const [activeTab, setActiveTab] = React.useState<string>('Umumiy');
  const [currentImage, setCurrentImage] =
    React.useState<StaticImageData>(home_umumiy);

  const [isShown, setIsShown] = React.useState<boolean>(false);

  return (
    <div className='relative w-full py-8 md:py-28' id='services'>
      <div className='layout'>
        <h1 className='font-primary text-2xl font-semibold leading-8 tracking-wider md:mb-6 md:text-[35px] md:leading-[40px] xl:text-[43px] xl:leading-[60px]'>
          Nima qilishi mumkin?
        </h1>
        {/* <h1 className='text-[40px]'>Imkoniyatlar</h1> */}
        <div className='mg:gap-16 relative flex w-full flex-col items-start justify-start gap-10 md:flex-row'>
          <div
            className={clsxm(
              'md:four-sided-shadow relative w-full bg-white pl-4 pt-7 transition-all md:z-10 md:w-[300px] md:rounded-xl  md:bg-transparent md:py-10 md:pt-10 md:shadow-none'
            )}
          >
            <div className='flex w-full flex-col items-start justify-start gap-6'>
              <ul className='flex w-full flex-col'>
                <li>
                  <h3 className='mb-2'>Umumiy analitika</h3>
                </li>
                <div className='no-scrollbar flex w-full gap-3 overflow-scroll md:flex-col md:gap-0'>
                  {UmumiyAnalytics.map((item, index) => (
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
                  <h3 className='mb-2'>Kategoriyalar</h3>
                </li>
                <div className='no-scrollbar flex w-full gap-3 overflow-scroll md:flex-col md:gap-0'>
                  {CategoryAnalytics.map((item, index) => (
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
                  <h3 className='mb-2'>Do'konlar</h3>
                </li>
                <div className='no-scrollbar flex w-full gap-3 overflow-scroll md:flex-col md:gap-0'>
                  {ShopAnalytics.map((item, index) => (
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
                  <h3 className='mb-2'>Mahsulotlar</h3>
                </li>
                <div className='no-scrollbar flex w-full gap-3 overflow-scroll md:flex-col md:gap-0'>
                  {ProductAnalytics.map((item, index) => (
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

              {/* <ul className='flex w-full flex-col'>
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
              </ul> */}
            </div>
          </div>
          <div className='four-sided-shadow flex-1 flex-col items-start justify-start rounded-lg  bg-slate-200 px-6 py-6 pb-12 md:static md:mt-6 md:flex'>
            <h2 className='mb-4 text-[18px] lg:text-3xl'>{activeTab}</h2>
            <div className='flex w-full flex-col gap-3'>
              <p className='mb-2'>{descriptions_uz[activeTab]}</p>
              <div className='h-full w-full'>
                <Zoom>
                  <Image
                    priority
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
