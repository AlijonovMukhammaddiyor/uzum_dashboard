import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import beginner from '@/assets/beginner.jpg';
import seller from '@/assets/seller.jpg';
import supplier from '@/assets/supplier.jpg';

const Cards = () => {
  const { i18n } = useTranslation('landing');
  const router = useRouter();

  const isUz = i18n.language === 'uz';

  return (
    <div className='layout flex w-full flex-col gap-6'>
      {/* First Card */}
      <div className='mb-4 flex w-full'>
        <Image
          src={beginner}
          alt='Seller'
          className='hidden h-auto w-1/2 object-contain md:block'
        />
        <div className='flex w-full flex-col justify-center p-8 md:w-1/2'>
          <h1 className='font-merri mb-6 text-2xl font-bold text-[#222] lg:text-4xl'>
            {isUz
              ? 'Uzum Marketga endigina kirib keldingizmi?'
              : 'Начинаете продавать на Uzum?'}
          </h1>
          <p className='font-primary mb-4 text-base text-gray-600'>
            {isUz
              ? "Biz sizga Marketni tushunishga, to'g'ri tovarlarni topishga, raqobati kam kategoriyalarni aniqlashga va shuningdek raqobatchilarni o'rganishga yordam beramiz."
              : 'Наши аналитические услуги направлены на то, чтобы помочь новичкам лучше понять рынок, найти категории с низкой конкуренцией, изучить потенциальных конкурентов и опережать их.'}
          </p>
          <button
            onClick={() => router.push('/register')}
            className='text-primary border-primary hover:bg-primary mt-4 rounded-md border px-4 py-2 font-bold transition-colors duration-200 hover:text-white'
          >
            {isUz ? 'Hoziroq boshlang' : 'Начать сейчас'}
          </button>
        </div>
      </div>

      {/* Second Card */}
      <div className='mb-4 flex w-full'>
        <div className='flex w-full flex-col justify-center p-8 md:w-1/2'>
          <h2 className='font-merri mb-6 text-2xl font-bold text-[#222] lg:text-4xl'>
            {isUz
              ? 'Allaqachon Uzumda savdo qilasizmi?'
              : 'Вы уже продаете на Uzum?'}
          </h2>
          <p className='mb-4 text-base text-gray-600'>
            {isUz
              ? 'Biz sizga savdoni optimallashtirish, bozorning yangi tendentsiyalarini aniqlash, raqobatchilar tahlili asosida mahsulot takliflarini oshirish, eng istiqbolli mahsulotlarga sarmoyangizni oshirish va foyda keltirmaydigan mahsulotlarga sarmoya kiritishni to‘xtatish hamda mahsulot narxini optimallashtirishda yordam beramiz.'
              : 'Мы поможем вам оптимизировать продажи, выявить новые тенденции рынка, увеличить товарное предложение на основе анализа конкурентов, увеличить инвестиции в наиболее перспективные продукты и прекратить вкладывать средства в убыточные продукты, а также оптимизировать цены на продукты.'}
          </p>
          <button
            onClick={() => router.push('/register')}
            className='text-primary border-primary hover:bg-primary mt-4 rounded-md border px-4 py-2 font-bold transition-colors duration-200 hover:text-white'
          >
            {isUz ? 'Hoziroq boshlang' : 'Начать сейчас'}
          </button>
        </div>
        <Image
          src={seller}
          alt='Beginner'
          className='hidden h-auto w-1/2 object-contain md:block'
        />
      </div>

      {/* Third Card */}
      <div className='mb-4 flex w-full'>
        <Image
          src={supplier}
          alt='Supplier'
          className='hidden h-auto object-contain  md:block md:w-1/2'
        />
        <div className='flex w-full flex-col justify-center p-8 md:w-1/2'>
          <h2 className='font-merri mb-6 text-2xl font-bold text-[#222] lg:text-4xl'>
            {isUz
              ? 'Katta brend yoki yetkazib beruvchimisiz?'
              : 'Вы крупный бренд или поставщик?'}
          </h2>
          <p className='mb-4 text-base text-gray-600'>
            {isUz
              ? "Etakchi brend yoki yetkazib beruvchi sifatida sizning bozordagi mavqeingiz hal qiluvchi ahamiyatga ega. Biz sizning ustunligingizni mustahkamlash, yangi tarqatish kanallarini ochish va turli xil iste'molchi bazangizning nozik afzalliklarini tushunish uchun sizga strategik tushunchalar bilan kuch beramiz. Bizning tahlillarimiz yordamida siz ta'minot zanjiri jarayonlarini soddalashtirishingiz, talabni yuqori aniqlik bilan prognoz qilishingiz va rivojlanayotgan iste'molchilar xatti-harakatlariga mos keladigan marketing strategiyalarini ishlab chiqishingiz mumkin. Raqobatbardosh bozorda o'z qamrovingizni kengaytirish va brendingiz rezonansini oshirish uchun biz bilan hamkorlik qiling."
              : 'Ваша позиция на рынке, как ведущего бренда или поставщика, имеет решающее значение. Мы даем вам стратегические идеи, которые помогут укрепить ваше доминирование, открыть новые каналы сбыта и понять нюансы предпочтений вашей разнообразной потребительской базы. С помощью нашей аналитики вы можете оптимизировать процессы цепочки поставок, прогнозировать спрос с большей точностью и разрабатывать маркетинговые стратегии, которые резонируют с меняющимся поведением потребителей. Сотрудничайте с нами, чтобы расширить свой охват и повысить резонанс вашего бренда на конкурентном рынке.'}
          </p>
          <button
            onClick={() => router.push('/register')}
            className='text-primary border-primary hover:bg-primary mt-4 rounded-md border px-4 py-2 font-bold transition-colors duration-200 hover:text-white'
          >
            {isUz ? 'Hoziroq boshlang' : 'Начать сейчас'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
