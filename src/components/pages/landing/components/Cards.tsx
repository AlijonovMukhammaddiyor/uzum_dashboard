import { useTranslation } from 'next-i18next';

const Cards = () => {
  const { i18n } = useTranslation('landing');

  const isUz = i18n.language === 'uz'; // only Russian and Uzbek

  return (
    <div className='flex w-full flex-col justify-center gap-4 space-x-6 md:-mt-36 lg:flex-row'>
      <div className='h-auto w-auto transform rounded-xl bg-[#E9FFC2] p-8 shadow-2xl transition-transform duration-200 ease-in-out hover:scale-105 lg:min-h-[450px] lg:w-1/3'>
        <h1 className='font-primary mb-6 text-2xl font-bold text-[#49852d] lg:text-4xl'>
          {isUz
            ? 'Uzum Marketga endigina kirib keldingizmi?'
            : 'Начинаете продавать на Uzum?'}
        </h1>
        <p className='font-primary mb-4 text-lg text-gray-800'>
          {isUz
            ? "Biz sizga Marketni tushunishga, to'g'ri tovarlarni topishga, raqobati kam kategoriyalarni aniqlashga va shuningdek raqobatchilarni o'rganishga yordam beramiz."
            : 'Наши аналитические услуги направлены на то, чтобы помочь новичкам лучше понять рынок, найти категории с низкой конкуренцией, изучить потенциальных конкурентов и опережать их.'}
        </p>
        <button className='mt-4 rounded-full bg-[#49852d] px-4 py-2 font-bold text-white transition-colors duration-200 hover:bg-green-600'>
          {isUz ? 'Hoziroq boshlang' : 'Начать сейчас'}
        </button>
      </div>

      <div className='ml-16 w-auto transform rounded-xl bg-[#A7ECEE] p-8 shadow-2xl transition-transform duration-200 ease-in-out hover:scale-105 lg:ml-0 lg:min-h-[450px] lg:w-1/3'>
        <h2 className='mb-6 text-2xl font-bold text-blue-700 lg:text-4xl'>
          {isUz
            ? 'Allaqachon Uzumda savdo qilasizmi?'
            : 'Вы уже продаете на Uzum?'}
        </h2>
        <p className='mb-4 text-lg text-gray-800'>
          {isUz
            ? 'Biz sizga savdoni optimallashtirish, bozorning yangi tendentsiyalarini aniqlash, raqobatchilar tahlili asosida mahsulot takliflarini oshirish, eng istiqbolli mahsulotlarga sarmoyangizni oshirish va foyda keltirmaydigan mahsulotlarga sarmoya kiritishni to‘xtatish hamda mahsulot narxini optimallashtirishda yordam beramiz.'
            : 'Мы поможем вам оптимизировать продажи, выявить новые тенденции рынка, увеличить товарное предложение на основе анализа конкурентов, увеличить инвестиции в наиболее перспективные продукты и прекратить вкладывать средства в убыточные продукты, а также оптимизировать цены на продукты.'}
        </p>
        <button className='mt-4 rounded-full bg-blue-600 px-4 py-2 font-bold text-white transition-colors duration-200 hover:bg-blue-700'>
          {isUz ? 'Hoziroq boshlang' : 'Начать сейчас'}
        </button>
      </div>

      <div className='no-scrollbar w-auto transform overflow-y-scroll rounded-xl bg-[#ACBCFF] p-8 shadow-2xl transition-transform duration-200 ease-in-out hover:scale-105 lg:min-h-[450px] lg:w-1/3'>
        <h2 className='mb-6 text-2xl font-bold text-purple-900 lg:text-4xl'>
          {isUz
            ? 'Katta brend yoki yetkazib beruvchimisiz?'
            : 'Вы крупный бренд или поставщик?'}
        </h2>
        <p className='mb-4 text-lg text-gray-800'>
          {isUz
            ? "Etakchi brend yoki yetkazib beruvchi sifatida sizning bozordagi mavqeingiz hal qiluvchi ahamiyatga ega. Biz sizning ustunligingizni mustahkamlash, yangi tarqatish kanallarini ochish va turli xil iste'molchi bazangizning nozik afzalliklarini tushunish uchun sizga strategik tushunchalar bilan kuch beramiz. Bizning tahlillarimiz yordamida siz ta'minot zanjiri jarayonlarini soddalashtirishingiz, talabni yuqori aniqlik bilan prognoz qilishingiz va rivojlanayotgan iste'molchilar xatti-harakatlariga mos keladigan marketing strategiyalarini ishlab chiqishingiz mumkin. Raqobatbardosh bozorda o'z qamrovingizni kengaytirish va brendingiz rezonansini oshirish uchun biz bilan hamkorlik qiling."
            : 'Ваша позиция на рынке, как ведущего бренда или поставщика, имеет решающее значение. Мы даем вам стратегические идеи, которые помогут укрепить ваше доминирование, открыть новые каналы сбыта и понять нюансы предпочтений вашей разнообразной потребительской базы. С помощью нашей аналитики вы можете оптимизировать процессы цепочки поставок, прогнозировать спрос с большей точностью и разрабатывать маркетинговые стратегии, которые резонируют с меняющимся поведением потребителей. Сотрудничайте с нами, чтобы расширить свой охват и повысить резонанс вашего бренда на конкурентном рынке.'}
        </p>
        <button className='mt-4 rounded-full bg-purple-800 px-4 py-2 font-bold text-white transition-colors duration-200 hover:bg-purple-900'>
          {isUz ? 'Hoziroq boshlang' : 'Начать сейчас'}
        </button>
      </div>
    </div>
  );
};

export default Cards;
