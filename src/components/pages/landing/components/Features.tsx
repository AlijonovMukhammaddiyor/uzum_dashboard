import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';

import category_products from '@/assets/features/category_products.png';
import category_segmentation from '@/assets/features/category_segmentation.png';
import category_shops from '@/assets/features/category_shops.png';
import category_trends from '@/assets/features/category_trends.png';
import product_compare_charts from '@/assets/features/compare_charts.png';
import filteredProducts from '@/assets/features/filtered.png';
import productFilters from '@/assets/features/filters.png';
import growing from '@/assets/features/growing_products.png';
import new_products from '@/assets/features/new_products.png';
import niches from '@/assets/features/niches.png';
import niches2 from '@/assets/features/niches2.png';
import product from '@/assets/features/product.png';
import product_compet from '@/assets/features/product_compet.png';
import product_positions from '@/assets/features/product_positions.png';
import shop_categiry from '@/assets/features/shop_category.png';
import shop_compare from '@/assets/features/shop_compare.png';
import shop_competitors from '@/assets/features/shop_competitors.png';
import shop_daily from '@/assets/features/shop_daily.png';
import shop_data from '@/assets/features/shop_data.png';
import shop_products from '@/assets/features/shop_products.png';
import week_best from '@/assets/features/week_best.png';

function Features() {
  const { i18n } = useTranslation('common');

  const cards = [
    {
      title: 'Mahsulotlar Kashf Etish',
      title_ru: 'Поиск товаров',
      description:
        "Trenddagi, talab yuqori va raqobatchilari kam bo'lgan mahsulotlarni tanlang. Bizning ilg'or mahsulotlarni kash qilish servisimiz orqali daromadli imkoniyatlarni qo'ldan boy bermang. Taxminlarga emas, ma'lumotlarga asoslanib qaror chiqaring.",
      description_ru:
        'Выбирайте товары, которые актуальны, имеют высокий спрос и мало конкурентов. С помощью нашего продвинутого инструмента для исследования товаров каждый ваш выбор будет обоснованным, гарантируя, что вы не упустите прибыльную возможность. Больше нет догадок – только решения на основе данных.',
      images: [
        {
          src: productFilters,
          alt:
            i18n.language === 'uz'
              ? 'Mahsulotlar topish uchun filtrlar'
              : 'Фильтры для поиска продуктов',
        },
        {
          src: filteredProducts,
          alt:
            i18n.language === 'uz'
              ? "Filrlangan mahsulotlar ro'yxati"
              : 'Список отфильтрованных продуктов',
        },
        {
          src: growing,
          alt:
            i18n.language === 'uz'
              ? "O'sayotgan mahsulotlar"
              : 'Перспективные продукты',
        },
        {
          src: new_products,
          alt:
            i18n.language === 'uz'
              ? ' Uzumdagi yangi mahsulotlar'
              : 'Новые продукты на Uzum',
        },
        {
          src: week_best,
          alt:
            i18n.language === 'uz'
              ? 'Haftaning eng yaxshi mahsulotlari'
              : 'Лучшие продукты недели',
        },
      ],
    },
    {
      title: 'Nisha Tanlash',
      title_ru: 'Выбор ниши',
      description:
        'Nishalarni ishonch bilan tanlang. Bizning nisha tanlash vositalarimiz kam raqobatga (kam sotuvchilarga va mahsulotlarga) ega va faolligi yuqori imkoniyatlarni aniqlashga yordam beradi. Vaqtingizni tejang va bir necha soniyalarni eng foydali nishalarni toping.',
      description_ru:
        'Выбирайте идеальную нишу с уверенностью. Наши инструменты выбора ниши позволяют выявить недооцененные и высокодоходные возможности. Откройте для себя области с минимальной конкуренцией и максимальной прибыльностью.',
      images: [
        {
          src: niches,
          alt:
            i18n.language === 'uz'
              ? "Barcha Nishalarni bir joyda ko'ring"
              : 'Все ниши в одном месте',
        },
        {
          src: niches2,
          alt:
            i18n.language === 'uz'
              ? 'Har bir nishani chuqur tahlil qiling'
              : 'Проведите глубокий анализ каждой ниши',
        },
      ],
    },
    {
      title: 'Mahsulot Analizi',
      title_ru: 'Анализ товаров',
      description_ru: `Наш инструмент предоставляет углубленный анализ каждого продукта, позволяя вам выявлять циклы пополнения запасов и избегать потери доходов. Изучите динамику продаж, анализ отзывов, и оптимизируйте цены. Получите информацию о конкурентах, сравните ключевые показатели и определите позицию вашего продукта на рынке`,
      description:
        "Bizning vositamiz har bir mahsulotning chuqur tahlilini taqdim etadi, bu sizga daromad yo'qotilishining oldini olishga, savdo dinamikasini o'rganishga, sharhlarni tahlil qilish hamda narxlarni optimallashtirish ga imkor beradi. Raqobatchilar haqida tushunchaga ega bo'ling, asosiy ko'rsatkichlarni taqqoslang va mahsulotingizning bozordagi o'rnini aniqlang.",
      images: [
        {
          src: product,
          alt:
            i18n.language === 'uz'
              ? "Mahsulot haqida batafsil ma'lumot"
              : 'Подробная информация о продукте',
        },
        {
          src: product_positions,
          alt:
            i18n.language === 'uz'
              ? "Mahsulotning bozordagi va kategoriyalardagi o'rni"
              : 'Позиция продукта на рынке',
        },
        {
          src: product_compet,
          alt:
            i18n.language === 'uz'
              ? 'Mahsulotning raqobatchilari'
              : 'Конкуренты продукта',
        },
        {
          src: product_compare_charts,
          alt:
            i18n.language === 'uz'
              ? 'Mahsulotni raqobatchilari bilan taqqoslash'
              : 'Сравнение продукта с конкурентами',
        },
      ],
    },
    {
      title: 'Kategoriyalar Tahlili',
      title_ru: 'Анализ категорий',
      description:
        "Sizni qiziqtirgan kategoriyalarni bizning keng qamrovli xizmatlarimiz orqali chuqur analiz qiling. Kategoriyaning mahsulotlari bo'yicha chuqur tadqiqot o'tkazing, uning so'nggi tendentsiyalarni kuzatib turing, TOP sotuvchilarni aniqlang hamda kategoriyaning narx segmentatsiyasi haqida tushunchaga ega bo'ling . Shuningdek, bozor segmentingiz imkoniyatlaridan maksimal darajada foydalanish uchun kichik toifalarning nozik tomonlarini tushunib oling",
      description_ru:
        'Погрузитесь в аналитику категорий с нашим комплексным инструментом. Проведите детальное исследование продуктов в категории, следите за последними тенденциями категорий, определите ведущих продавцов и получите представление о ценовом сегментировании. Кроме того, разберитесь в тонкостях подкатегорий, чтобы наиболее эффективно использовать потенциал вашего рыночного сегмента.',
      images: [
        {
          src: category_products,
          alt:
            i18n.language === 'uz' ? 'Kategoriyadagi mahsulotlar' : 'Продукты',
        },
        {
          src: category_trends,
          alt: i18n.language === 'uz' ? 'Kategoriyadagi trendlar' : 'Тренды',
        },
        {
          src: category_segmentation,
          alt:
            i18n.language === 'uz'
              ? 'Kategoriyadagi mahsulotlar segmentatsiya'
              : 'Сегментация продуктов',
        },
        {
          src: category_shops,
          alt:
            i18n.language === 'uz'
              ? "Kategoriyadagi savdo qilayotgan do'konlar"
              : 'Магазины, продающие в категории',
        },
      ],
    },
    {
      title: "Do'kon Tahlili",
      title_ru: 'Анализ магазина',
      description_ru:
        'Разблокируйте потенциал вашего магазина с помощью инструментов аналитики магазина. Отслеживайте продажи, рейтинги и эффективность товаров за последние три месяца. Используйте наш ABC-анализ для коррекции вашего списка товаров, учитывая как активные, так и временно снятые с продажи товары. Получите детализированный обзор по категориям и имейте доступ к ежедневным отчетам о продажах, детализируя количество продаж, изменения цен и отзывы.',
      description:
        "Doʻkon tahlili xizmatlarimiz orqali doʻkoningiz salohiyatini oching. So'nggi uch oy ichida sotuvlar, reytinglar va mahsulot samaradorligini kuzating. Faol va to‘xtatilgan mahsulotlarni hisobga olgan holda mahsulot ro‘yxatini o‘zgartirish uchun ABC tahlilimizdan foydalaning. Do'konning har bir sotuv kategoriyalari bo'yicha batafsil ma'lumot oling va kunlik savdo hisobotlari, buyurtmalar, narxlar o'zgarishi va izohlar soni bilan tanishing.",
      images: [
        {
          src: shop_data,
          alt: i18n.language === 'uz' ? 'Doʻkon maʼlumotlari' : 'Данные',
        },
        {
          src: shop_products,
          alt:
            i18n.language === 'uz'
              ? 'Doʻkonning sotuvdagi va sotuvdan chiqqan mahsulotlari'
              : 'Продукты в продаже и снятые с продажи',
        },
        {
          src: shop_daily,
          alt:
            i18n.language === 'uz'
              ? 'Doʻkonning kunlik sotuvlari (oxirgi 100 kun)'
              : 'Ежедневные продажи магазина (последние 100 дней)',
        },
        {
          src: shop_categiry,
          alt:
            i18n.language === 'uz'
              ? "Doʻkonning har bir kategoriya bo'yicha tahlili"
              : 'Анализ магазина по каждой категории',
        },
      ],
    },
    {
      title: 'Raqobatchilar Tahlili',
      title_ru: 'Анализ конкурентов',
      description_ru:
        'Проведите глубокий анализ конкурентов с нашими инструментами. Определите 10 ваших ближайших конкурентов и проведите детальное сравнение с каждым по различным категориям и показателям, таким как заказы, доходы, отзывы, средняя цена и многие другие. Углубитесь, детально анализируя продукты ваших конкурентов, чтобы всегда оставаться впереди на рынке',
      description:
        "Xizmatlarimiz yordamida raqobatchilaringizni chuqur tahlil qiling. O'zingizning eng yaqin 10 ta raqibatchilaringizni aniqlang va buyurtmalar, daromadlar, sharhlar, o'rtacha narx va boshqalar kabi turli toifalar va ko'rsatkichlar bo'yicha har biri bilan batafsil taqqoslang. Ulardan oldinga o'tish uchun raqobatchilaringizning mahsulotlarini batafsil tahlil qiling.",
      images: [
        {
          src: shop_competitors,
          alt:
            i18n.language === 'uz'
              ? "Do'konning eng yaqin raqobatchilari"
              : 'Ближайшие конкуренты магазина',
        },
        {
          src: shop_compare,
          alt:
            i18n.language === 'uz'
              ? "Do'konning raqobatchilari bilan taqqoslash"
              : 'Сравнение магазина с конкурентами',
        },
        {
          src: shop_products,
          alt:
            i18n.language === 'uz'
              ? 'Raqobatchilarning mahsulotlari'
              : 'Продукты конкурентов',
        },
      ],
    },
    // {
    //   title: 'Telegram Bot',
    //   title_ru: 'Телеграм Бот',
    //   description_ru:
    //     'Пользуйтесь нашим ботом для Telegram и получайте ежедневные отчеты о своих магазинах и продуктах, а также о конкурентах. В отчете представлена детальная информация о продажах за вчерашний день и текущую неделю, изменениях в ценах, карточке товара и многом другом. Это отличный инструмент, который позволит вам постоянно контролировать интересующие магазины и продукты.',
    //   description:
    //     "Bizning Telegram botimizdan foydalaning va do'konlaringiz va mahsulotlaringiz, shuningdek, raqobatchilaringiz haqida kundalik hisobotlarni oling. Hisobotda kechagi va joriy haftadagi sotuvlar, narxlardagi o‘zgarishlar, mahsulot kartalari va boshqalar haqida batafsil ma’lumotlar keltirilgan. Bu sizni qiziqtirgan do'konlar va mahsulotlarni doimiy ravishda kuzatib borish imkonini beruvchi ajoyib vositadir.",
    //   images: [],
    // },
  ];
  const [currentTab, setCurrentTab] = useState(cards[0]);
  const router = useRouter();

  return (
    <div
      className='layout all_side_shadow z-10 my-10 rounded-lg bg-slate-200 p-4 md:p-10'
      id='services'
    >
      {i18n.language === 'ru' ? (
        <div className='font-merri base:text-4xl mb-16 text-2xl font-bold text-[#333]'>
          <span className='text-primary'>Выявите</span> прибыльные сегменты и
          следуйте <span className='text-primary'>актуальными трендами</span>.
        </div>
      ) : (
        <div className='font-merri base:text-4xl mb-16 text-2xl font-bold text-[#333]'>
          <span className='text-primary'>Daromadli</span> segmentlarni aniqlang
          va eng so'nggi <span className='text-primary'>trendlarga </span>{' '}
          moslashing.
        </div>
      )}
      <div className='flex w-full items-center justify-start gap-5 overflow-y-scroll'>
        <div className='flex w-full'>
          {cards.map((card) => (
            <Card
              key={card.title}
              title={i18n.language === 'uz' ? card.title : card.title_ru}
              onClick={() => setCurrentTab(card)}
              currentTab={
                i18n.language === 'uz' ? currentTab.title : currentTab.title_ru
              }
            />
          ))}
        </div>
      </div>
      <div className='mt-8 flex w-full flex-col items-center gap-5 md:flex-row'>
        <div className='mb-6 w-full md:mb-0 md:w-1/3'>
          <h2 className='font-merri mb-3'>
            {i18n.language === 'uz' ? currentTab?.title : currentTab?.title_ru}
          </h2>
          <p className='w-full text-lg font-semibold text-slate-500 md:w-[calc(75%)]'>
            {i18n.language === 'uz'
              ? currentTab?.description
              : currentTab?.description_ru}
          </p>
          <button
            className='bg-primary hover:text-primary border-primary mt-10 hidden rounded-md border-2 px-6 py-3 text-white transition-colors hover:bg-white md:block'
            onClick={() => {
              router.push('/register');
            }}
          >
            {i18n.language === 'uz' ? "Sinab ko'rish" : 'Попробуйте сейчас'}
          </button>
        </div>
        <div className='mb-6 flex-1 md:mb-0'>
          <Carousel
            autoPlay
            infiniteLoop
            showStatus={true}
            showThumbs={false}
            interval={5000}
            className=''
            emulateTouch={true}
            showArrows={true}
          >
            {currentTab?.images?.map((image) => {
              return (
                <div
                  key={image.src.src}
                  className='min-h-[300px] rounded-md md:min-h-[500px] xl:min-h-[550px]'
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <Image
                    src={image.src}
                    priority
                    width={500}
                    height={500}
                    alt={image.alt}
                    className='rounded-md border-2 border-slate-800'
                  />
                  <p
                    className='legend text-xl'
                    style={{
                      backgroundColor: 'transparent',
                      opacity: 1,
                      color: 'black',
                      border: '1px solid black',
                    }}
                  >
                    {image.alt}
                  </p>
                </div>
              );
            })}
          </Carousel>
          <button
            className='bg-primary hover:text-primary border-primary mt-10 w-full rounded-md border-2 px-6 py-3 text-white transition-colors hover:bg-white md:hidden md:w-auto'
            onClick={() => {
              router.push('/register');
            }}
          >
            {i18n.language === 'uz' ? "Sinab ko'rish" : 'Попробуйте сейчас'}
          </button>
        </div>
      </div>
    </div>
  );
}

const Card = ({
  title,
  onClick,
  currentTab,
}: {
  title: string;
  onClick: () => void;
  currentTab: string;
}) => {
  return (
    <div
      onClick={onClick}
      className={`font-merri m-2 flex max-h-16 shrink-0 cursor-pointer items-center justify-center rounded-md border border-slate-800 px-4 py-4 transition-colors duration-300 md:px-8 md:py-4 ${
        currentTab === title
          ? 'bg-slate-800 text-white'
          : 'bg-white text-black shadow-md hover:shadow-lg'
      }`}
    >
      {title}
    </div>
  );
};

export default Features;
