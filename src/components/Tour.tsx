// import { STATUS } from 'react-joyride';
import { Steps } from 'intro.js-react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

const Tour = () => {
  const [runTour, setRunTour] = useState(false);
  const [isRightPage, setIsRightPage] = useState(false);
  const { i18n } = useTranslation('common');
  const router = useRouter();

  const isUz = i18n.language === 'uz';

  const steps = [
    {
      element: '.my-first-step',
      disableBeacon: true,
      position: 'right' as const,
      intro: (
        <div className='flex flex-col gap-2 '>
          <p className=''>
            <strong>{isUz ? 'Tahlil' : 'Анализ'}</strong>:{' '}
            {isUz
              ? 'Bu sahifa yordamida barcha mahsulotlarni tezda va aniq tahlil qilishingiz mumkin.'
              : 'На этой странице вы сможете быстро и точно проанализировать все товары.'}
          </p>
          <p>
            <strong>{isUz ? 'Filtrlar' : 'Фильтры'}</strong>:{' '}
            {isUz
              ? "Filtrlar yordamida har qanday turdagi (xoh sotuvi o'sayotgan xoh sotuvi kamayayotgan) mahsulotlarni toping."
              : 'С помощью фильтров можно найти любой товар (продажи которого растут или падают).'}
          </p>
          <p>
            <strong>{isUz ? 'Trendlar' : 'Тренды'}</strong>:{' '}
            {isUz
              ? "Haftaning yoki oyning eng ko'p daromad keltirgan mahsulotlarini ko'ring."
              : 'Посмотрите продукты, которые принесли наибольший доход за последнюю неделю или месяц.'}
          </p>
        </div>
      ),
      // "Ushbu sahifada barcha mahsulotlarni tahlil qilishingiz, o'zingiz xohlagan daromadli mahsulotlar kashf etishingiz yoki endigina o'sayotgan mahsulotlar, haftaning yoki oyning eng ko'p daromad keltirgan mahsulotlarini ko'rishingiz mumkin.",
    },
    {
      element: '.my-second-step',
      disableBeacon: true,
      position: 'right' as const,
      intro: (
        <div className='flex flex-col gap-2'>
          <p className=''>
            <strong>{isUz ? 'Tahlil' : 'Анализ'}</strong>:{' '}
            {isUz
              ? "Bu sahifa yordamida barcha do'konlarni tezda va aniq tahlil qilishingiz mumkin."
              : 'На этой странице вы можете быстро и подробно просмотреть все магазины.'}
          </p>
          <p>
            <strong>{isUz ? 'Umumiy' : 'Общий'}</strong>:{' '}
            {isUz
              ? "Do'konning oxirgi 90 kundagi daromadlari, buyurtmalari, mahsulotlari va ularning narxlarini ko'ring."
              : 'Просмотр доходов, заказов, продуктов и их цен за последние 90 дней.'}
          </p>
          <p>
            <strong>{isUz ? 'Tovarlar' : 'Товары'}</strong>:{' '}
            {isUz
              ? "Do'konning barcha sotuvdagi va sotuvdan chiqqan mamhsulotlari va ularning batafsil tahlilini ko'ring."
              : 'Просмотр всех товаров магазина, включая товары, снятые с продажи, и их подробный анализ.'}
          </p>
          <p>
            <strong>{isUz ? 'Kunlik Savdo' : 'Ежедневные продажи'}</strong>:
            {isUz
              ? "Do'konning oxirgi 60-90 kun mobaynida har bir kunda bo'lgan buyurtmalari va o'zgarishlarini kuzating."
              : 'Просмотр ежедневных заказов и изменений за последние 60-90 дней.'}
          </p>
          <p>
            <strong>{isUz ? 'Raqobatchilar' : 'Конкуренты'}</strong>:{' '}
            {isUz
              ? "Do'konning eng yaqin 10 ta raqobatchilarini ko'ring va ularni barcha jihatdan taqqoslang."
              : 'Посмотрите на 10 ближайших конкурентов магазина и сравните их со всех сторон.'}
          </p>
          <p>
            <strong>{isUz ? 'Kategoriyalar' : 'Категории'}</strong>:{' '}
            {isUz
              ? "Do'konning barcha kategoriyalardagi tovarlari, sotuvi haqida batafsil ma'lumot oling."
              : 'Получайте подробную информацию о товарах и распродажах во всех категориях магазина.'}
          </p>
        </div>
      ),
    },
    {
      element: '.my-third-step',
      disableBeacon: true,
      position: 'right' as const,
      intro: (
        <div className='flex flex-col gap-2'>
          <p className=''>
            <strong>{isUz ? 'Tahlil' : 'Анализ'}</strong>:{' '}
            {isUz
              ? 'Uzumdagi barcha kategoriyalarni tahlil qiling.'
              : 'Анализируйте все категории на Uzum.'}
          </p>
        </div>
      ),
    },
    {
      element: '.my-fourth-step',
      disableBeacon: true,
      position: 'right' as const,
      intro: (
        <div className='flex flex-col gap-2'>
          <p className=''>
            <strong>{isUz ? 'Umumiy' : 'Общий'}</strong>:{' '}
            {isUz
              ? "Uzumdagi barcha umumiy statiskalarni o'rganing va mavjud kategoriyalarning turli statistikalarga asoslangan ulushlarini ko'ring."
              : 'Посмотрите всю общую статистику по Uzumu и найдите сегментацию всех категорий на основе различных статистических данных.'}
          </p>
        </div>
      ),
    },
    {
      element: '.my-fifth-step',
      disableBeacon: true,
      position: 'right' as const,
      intro: (
        <div className='flex flex-col gap-2'>
          <p className=''>
            <strong>{isUz ? 'Nishalar' : 'Ниши'}</strong>:{' '}
            {isUz
              ? "Uzumdagi barcha nishalarni ko'ring va ularni tahlil qiling."
              : 'Посмотрите все ниши на Uzum и проанализируйте их.'}
          </p>
        </div>
      ),
    },
    {
      element: '.my-sixth-step',
      disableBeacon: true,
      position: 'right' as const,
      intro: (
        <div className='flex flex-col gap-2'>
          <p className=''>
            <strong>{isUz ? 'Reklamalar' : 'Рекламы'}</strong>:{' '}
            {isUz
              ? "Uzumdagi barcha reklama berilgan mahsulotlarni va reklama ularga qanday ta'sir qilganligini o'rganing."
              : 'Просмотрите все рекламируемые продукты и узнайте, как реклама повлияла на их продажи.'}
          </p>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const path = router.pathname;
    if (path !== '/' && path !== '/login' && path !== '/register') {
      setIsRightPage(true);
    }

    const tourCompleted = localStorage.getItem('tourCompleted');
    if (!tourCompleted) {
      setRunTour(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeof window]);

  const handleTourComplete = () => {
    if (
      router.pathname === '/' ||
      router.pathname === '/login' ||
      router.pathname === '/register'
    ) {
      return;
    }
    localStorage.setItem('tourCompleted', 'true');
  };

  return (
    <>
      {/* <JoyRideNoSSR
        steps={steps}
        run={runTour}
        continuous={true}
        callback={(data) => {
          const { status } = data;
          if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as any)) {
            handleTourComplete();
          }
        }}
        showSkipButton={true}
        showProgress={true}
        styles={{
          tooltipContainer: {
            textAlign: 'left',
            marginLeft: 0,
          },
          buttonNext: {
            backgroundColor: 'green',
          },
          buttonBack: {
            marginRight: 10,
          },
        }}
        locale={{
          back: isUz ? 'Ortga' : 'Назад', // Custom button text for the "back" button
          close: isUz ? 'Yopish' : 'Закрыть', // Custom button text for the "close" button
          last: isUz ? 'Tugatish' : 'Завершить', // Custom button text for the "last" button
          next: isUz ? 'Keyingi' : 'Далее', // Custom button text for the "next" button
          skip: isUz ? "O'tkazib yuborish" : 'Пропустить', // Custom button text for the "skip" button
        }}
      /> */}
      {router.pathname !== '/' &&
        router.pathname !== '/login' &&
        router.pathname !== '/register' && (
          <Steps
            enabled={runTour}
            steps={steps}
            onExit={() => {
              return;
            }}
            initialStep={0}
            onComplete={handleTourComplete}
            options={{
              showProgress: true,
              showBullets: true,
              scrollToElement: true,
              scrollTo: 'tooltip',
              disableScrolling: true,
              hideBackButton: true,
              hideFooter: true,
              showButtons: true,
              nextLabel: isUz ? 'Keyingi' : 'Далее',
              prevLabel: isUz ? 'Ortga' : 'Назад',
              skipLabel: isUz ? '' : '',
              showStepNumbers: false,
              exitOnOverlayClick: false, // disable exiting when overlay is clicked
              exitOnEsc: false, // disable e

              keyboardNavigation: true,
              locale: {
                back: isUz ? 'Ortga' : 'Назад',
                close: isUz ? 'Yopish' : 'Закрыть',
                last: isUz ? 'Tugatish' : 'Завершить',
                next: isUz ? 'Keyingi' : 'Далее',
                skip: isUz ? "O'tkazib yuborish" : 'Пропустить',
              },
            }}
          />
        )}
    </>
  );
};

export default Tour;
