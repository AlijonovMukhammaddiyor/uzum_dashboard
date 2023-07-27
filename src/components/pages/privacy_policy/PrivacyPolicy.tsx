import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';

import clsxm from '@/lib/clsxm';

import Footer1 from '@/components/pages/landing/components/Footer1';
import LandingHeader from '@/components/pages/landing/components/LandingHeader';

const PrivacyPolicy = () => {
  const contactEmail = 'info@uzanalitika.uz';
  const privacyPolicyLink = 'https://uzanalitika.uz/privacy-policy';
  const wesiteLink = 'https://uzanalitika.uz';

  const router = useRouter();
  const { t } = useTranslation('login');
  const { i18n } = useTranslation('landing');
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    onToggleLanguageClick(lng);
  };

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, router.asPath, { locale: newLocale });
  };
  return (
    <>
      <LandingHeader />
      <div className='bg-gradient  w-full overflow-hidden pb-32 pt-20'>
        <div className='border-primary fixed right-0 top-20 z-10 flex h-9 items-center justify-center overflow-hidden rounded-l-md border bg-purple-200 bg-opacity-25'>
          <div
            className={clsxm(
              'relative flex h-full w-10 cursor-pointer items-center justify-center bg-white p-2 text-sm',
              i18n.language === 'uz' && 'bg-primary text-white'
            )}
            onClick={() => changeLanguage('uz')}
          >
            Uz
          </div>
          <div
            className={clsxm(
              'relative flex h-full w-10 cursor-pointer items-center justify-center bg-white p-2 text-sm',
              i18n.language === 'ru' && 'bg-primary text-white'
            )}
            onClick={() => changeLanguage('ru')}
          >
            Рус
          </div>
        </div>
        <div className='layout flex flex-col gap-8  bg-white p-20'>
          <h1 className='border-b border-gray-400 pb-4'>Mahfiylik siyosati</h1>
          <ol className='mt-4 list-decimal text-xl'>
            <li className='leading tracking-normal'>
              <p className='mt-4 font-bold '>Mahfiylik siyosati</p>
              <ol className='  ml-6 mt-4 list-decimal'>
                <li className=''>
                  <p>
                    Ushbu Maxfiylik siyosati O‘zbekiston Respublikasining
                    2019-yil 2-iyuldagi “Shaxsga doir ma’lumotlar to‘g‘risida”gi
                    O‘RQ-547-son Qonuni talablariga muvofiq tuzilgan bo‘lib,
                    “UzAnalitika.uz” MChJ (keyingi o‘rinlarda "UzAnalitika.uz"
                    deb ataladi) qanday faoliyat ko‘rsatishini tavsiflaydi.
                    Internetda www.uzanalitika.uz yoki uzanalitika.uz domenidagi
                    boshqa manzilda joylashgan Xizmatimizdan foydalanishingiz
                    bilan bog'liq ma'lumotlarni to'playdi, foydalanadi va
                    tarqatadi.
                  </p>
                </li>
                <li className='leading tracking-normal'>
                  <p>
                    UzAnalitika.uz turli manbalardan Xizmatimiz
                    foydalanuvchilari (keyingi o‘rinlarda “foydalanuvchilar” deb
                    yuritiladi) haqidagi ma’lumotlarni to‘plashi va olishi
                    mumkin, masalan:
                  </p>
                  <ul className=' ml-6 mt-4 list-disc'>
                    <li className='leading tracking-normal'>
                      ro‘yxatdan o‘tish vaqtida foydalanuvchi tomonidan
                      Xizmatdagi foydalanuvchi akkaunti orqali taqdim etilgan
                      ma’lumotlar;
                    </li>
                    <li className='leading tracking-normal'>
                      foydalanuvchi tomonidan Xizmatdan foydalanishda
                      foydalanuvchi hisobi orqali taqdim etilgan ma'lumotlar;
                    </li>
                    <li className='leading tracking-normal'>
                      O‘zbekiston Respublikasining amaldagi qonunchiligiga
                      muvofiq uchinchi tomon saytlari, xizmatlari va
                      hamkorlaridan olingan ma’lumotlar.
                    </li>
                  </ul>
                </li>
                <li className='leading tracking-normal'>
                  <p>
                    UzAnalitika.uz foydalanuvchilarni Xizmatdan foydalanishdan
                    oldin ushbu Maxfiylik siyosati qoidalarini to‘liq o‘qib
                    chiqishga va tanishishga chorlaydi.
                  </p>
                </li>
              </ol>
            </li>
            <li className='leading tracking-normal'>
              <p className='mt-4 font-bold '>
                UzAnalitika.uz tomonidan to'planadigan foydalanuvchi
                ma'lumotlari
              </p>
              <ol className=' ml-6 mt-4 list-decimal'>
                <li className='leading tracking-normal'>
                  <p>Foydalanuvchilar tomonidan taqdim etilgan ma'lumotlar.</p>
                  <ol className='ml-6 mt-4 list-decimal'>
                    <li className='leading tracking-normal'>
                      Hisob ma'lumotlari. Foydalanuvchi o‘z akkauntini
                      yaratganda (ro‘yxatdan o‘tkazganda) Xizmat
                      foydalanuvchining aloqa ma’lumotlarini, jumladan to‘liq
                      FISH, manzil, elektron pochta manzili va telefon raqami
                      kabi elementlarni so‘rashi mumkin.
                    </li>
                    <li className='leading tracking-normal'>
                      To'lov ma'lumotlari. Agar foydalanuvchi Hisobga moliyaviy
                      hisob va to'lov usuli ma'lumotlarini qo'shganda, bu
                      ma'lumot uchinchi tomon to'lov protsessoriga yuboriladi.
                      Xizmat foydalanuvchilarning moliyaviy hisobi haqidagi
                      ma'lumotlarni o'z serverlarida saqlamaydi; ammo, Xizmatga
                      ulangan uchinchi tomon to'lov tizimi orqali o'tgan
                      foydalanuvchilar haqidagi ma'lumotlarga kirish huquqiga
                      ega va saqlashi mumkin.
                    </li>
                    <li className='leading tracking-normal'>
                      Aloqa kanallari. Foydalanuvchi UzAnalitika.uz vakillari
                      bilan to‘g‘ridan-to‘g‘ri bog‘langanda Xizmat qo‘shimcha
                      ma’lumotlarni, jumladan: ismingiz, elektron pochta
                      manzilingiz, telefon raqamingiz, foydalanuvchi Xizmat
                      vakiliga yuborishi mumkin bo‘lgan xabar mazmuni va/yoki
                      qo‘shimchalar va foydalanuvchi taqdim etishi mumkin
                      bo'lgan boshqa ma’lumotlarni olishi mumkin. Shuningdek,
                      foydalanuvchi UzAnalitika.uz saytidan yuborilgan elektron
                      xatni ochganida tasdiqlab olishi mumkin.
                    </li>
                    <li className='leading tracking-normal'>
                      Foydalanuvchidan taqdim etishi so‘ralgan shaxsiy
                      ma’lumotlar va ulardan uni taqdim etishining sabablari
                      Xizmat foydalanuvchiga tegishli shaxsiy ma’lumotlarni
                      taqdim etishni so‘ragan vaqtda e’lon qilinadi va
                      tushuntiriladi.
                    </li>
                  </ol>
                </li>
                <li className='leading tracking-normal'>
                  <p>
                    Foydalanuvchi bizning Xizmatimizdan foydalanganda
                    UzAnalitika.uz tomonidan to'planadigan ma'lumotlar.
                  </p>
                  <ol className='ml-6 mt-4 list-decimal'>
                    <li className='leading tracking-normal'>
                      Cookie fayllari va boshqa kuzatuv texnologiyalari.
                      UzAnalitika.uz, boshqa ko'plab veb-saytlar singari,
                      avtomatik ravishda ba’zi ma'lumotlarni to'playdi va uni
                      maxsus jurnal fayllarida saqlaydi. Bundan tashqari,
                      foydalanuvchi bizning Xizmatimizdan foydalanganda,
                      UzAnalitika.uz foydalanuvchi qurilmasidan maʼlum bir
                      maʼlumotlarni avtomatik toʻplashi mumkin. Bunday
                      ma'lumotlar IP-manzil, brauzer turi, Internet-xizmat
                      provayderi (ISP) nomi, havola qilingan sahifalar,
                      operatsion tizim, sana va vaqt, sayt trafigining
                      statistikasi (kliklar), ochilish sahifasi va havolaning
                      URL manzilini o'z ichiga olishi mumkin. Xizmatimizdan
                      foydalanganingizda UzAnalitika.uz ushbu maʼlumotlarni
                      cookie-fayllar orqali toʻplaydi. Cookie-fayllar bizning
                      web-serverlarimizga foydalanuvchilarni tanib olish
                      imkonini beradigan oz miqdordagi ma'lumotlarni o'z ichiga
                      oladi. Xizmat cookie-fayllar yordamida to'plagan
                      ma'lumotlarni saqlaydi, log fayllari va/yoki foydalanuvchi
                      imtiyozidagi shaffof GIF rasmlarni yozib olish uchun.
                      Shuningdek, UzAnalitika.uz foydalanuvchilarning Xizmatimiz
                      funksiyalaridan foydalanishi, Xizmatimiz funksionalligi,
                      tashriflar chastotasi va foydalanuvchilarning Xizmat bilan
                      o‘zaro aloqasiga bog‘liq boshqa ma’lumotlarni avtomatik
                      ravishda to‘plashi mumkin.
                    </li>
                    <li className='leading tracking-normal'>
                      Xizmatimizdan foydalanish. Foydalanuvchi bizning
                      xizmatimizdan foydalanganda, UzAnalitika.uz xizmat bilan
                      foydalanuvchilarning o'zaro munosabatlari va undan
                      foydalanish, shu jumladan, xizmat bo'yicha navigatsiya
                      ma'lumotlari va tizim darajasidagi ko'rsatkichlar
                      to'g'risida ma'lumot to'plashi mumkin. UzAnalitika.uz
                      ushbu ma'lumotlardan xizmatning faoliyati, xizmatning
                      ishlashini ta'minlash va yaxshilash, xizmatdan foydalanish
                      qulayligini oshirish, yangi xususiyatlarni ishlab chiqish,
                      xizmatimiz va foydalanuvchilarimiz xavfsizligini himoya
                      qilish va foydalanuvchilarni qo'llab-quvvatlash uchun
                      foydalanadi. Xizmat shuningdek, statistik tahlil va
                      biznes- analitika uchun olingan ma'lumotlardan
                      foydalanadi, bu Xizmatga faoliyat yuritish, himoya qilish,
                      asoslangan qarorlar qabul qilish va biznesimiz natijalari
                      to'g'risida hisobot berish imkonini beradi.
                    </li>
                  </ol>
                </li>
                <li className='leading tracking-normal'>
                  <p>Uchinchi shaxslardan olingan ma'lumotlar.</p>
                  <ol className='ml-6 mt-4 list-decimal'>
                    <li className='leading tracking-normal'>
                      Uchinchi tomon hisoblari. Agar foydalanuvchi bizning
                      Xizmatimizni uchinchi tomon akkaunti bilan bog‘lashni
                      tanlasa, UzAnalitika.uz bog‘lanishni avtorizatsiya qilish
                      uchun ushbu akkaunt va foydalanuvchining uchinchi tomon
                      akkauntidan autentifikatsiya tokeni haqida ma’lumot oladi.
                      Agar foydalanuvchi biz uchun mavjud bo'lgan ma'lumotlarni
                      cheklamoqchi bo'lsa, ularning imkoniyatlari haqida bilish
                      uchun uchinchi tomon hisoblarining maxfiylik sozlamalariga
                      tashrif buyurishi kerak.
                    </li>
                    <li className='leading tracking-normal'>
                      Uchinchi tomon hamkorlari. Xizmat shuningdek, uchinchi
                      tomon hamkorlaridan foydalanuvchilar haqidagi ommaviy
                      ma'lumotlarni olishi va uni foydalanuvchilar haqidagi
                      ma'lumotlar bilan birlashtirishi mumkin.
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
            <li className='leading tracking-normal'>
              <p className='mt-4 font-bold '>
                Xizmat ma'lumotlardan qanday foydalanadi
              </p>
              <ol className=' ml-6 mt-4 list-decimal'>
                <li className='leading tracking-normal'>
                  UzAnalitika.uz oʻzi toʻplagan maʼlumotlardan turli usullarda
                  foydalanadi, jumladan:
                  <ul className='ml-6 mt-4 list-disc'>
                    <li className='leading tracking-normal'>
                      Xizmatimizni taqdim etish, foydalanish va saqlash;
                    </li>
                    <li className='leading tracking-normal'>
                      Xizmatimizni yaxshilash, shaxslantirish va rivojlantirish;{' '}
                    </li>
                    <li className='leading tracking-normal'>
                      Foydalanuvchi bizning Xizmatimizdan qanday foydalanishini
                      bilish va tahlil qilish;
                    </li>
                    <li className='leading tracking-normal'>
                      Yangi mahsulotlar, xizmatlar, xususiyatlar va
                      funksionallikni ishlab chiqish;
                    </li>
                    <li className='leading tracking-normal'>
                      Foydalanuvchilar bilan to'g'ridan-to'g'ri yoki
                      hamkorlarimizdan biri orqali, jumladan, foydalanuvchilarga
                      xizmat ko'rsatish, Xizmatga oid yangilanishlar va boshqa
                      ma'lumotlarni taqdim etish, marketing va reklama
                      maqsadlarida bog'lanish;
                    </li>
                    <li className='leading tracking-normal'>
                      Foydalanuvchilarga matnli xabarlar va
                      push-bildirishnomalarni yuborish;
                    </li>
                    <li className='leading tracking-normal'>
                      Firibgarlikni aniqlash va oldini olish;
                    </li>
                    <li className='leading tracking-normal'>
                      hamda muvofiqlik maqsadida, shu jumladan UzAnalitika.uz
                      Foydalanuvchi shartnomasiga yoki boshqa qonuniy huquqlarga
                      rioya qilish yoki amaldagi qonunlar va qoidalar talabiga
                      binoan yoki har qanday yuridik jarayon yoki davlat
                      organining talabiga binoan.
                    </li>
                  </ul>
                </li>
              </ol>
            </li>
            <li className='leading tracking-normal'>
              <p className='mt-4 font-bold '>
                Xizmat ma'lumotni qanday tarqatadi
              </p>
              <ol className=' ml-6 mt-4 list-decimal'>
                <li className='leading tracking-normal'>
                  UzAnalitika.uz oʻzi toʻplagan maʼlumotlarni turli yoʻllar
                  bilan boʻlishishi mumkin, jumladan, quyidagilar
                  <ol className='ml-6 mt-4 list-decimal'>
                    <li className='leading tracking-normal'>
                      Sotuvchilar va xizmat koʻrsatuvchi provayderlar: Biz
                      UzAnalitika.uz nomidan xizmatlar koʻrsatuvchi uchinchi
                      tomon sotuvchilari va xizmat koʻrsatuvchi provayderlar
                      bilan maʼlumot almashishimiz mumkin, masalan, reklama
                      va/yoki marketing maqsadlarida Xizmatimizni koʻrsatishda
                      yordam berish hamda foydalanuvchilarga quyidagilar bilan
                      bogʻliq maʼlumotlar masalan, mahsulot e'lonlari, maxsus
                      takliflar yoki boshqa ma'lumotlarni taqdim etish.
                    </li>
                    <li className='leading tracking-normal'>
                      Xulosa maʼlumot: Qonunan ruxsat etilgan hollarda,
                      UzAnalitika.uz hamkorlarimiz bilan foydalanuvchilar
                      haqidagi maʼlumotlarni foydalanuvchini identifikatsiya
                      qilishda foydalana olmaydigan umumiy yoki anonim shaklda
                      foydalanishi va berishi mumkin.
                    </li>
                    <li className='leading tracking-normal'>
                      Reklama: UzAnalitika.uz uchinchi tomon reklama hamkorlari
                      bilan ishlaydi, bu Xizmat foydalanuvchilarga qiziq
                      bo'lishi mumkin bo'lgan reklamalarni ko'rsatadi. Ushbu
                      reklama hamkorlari bizning Xizmatimizda o'zlarining cookie
                      fayllari, piksel teglari va shunga o'xshash
                      texnologiyalarini o'rnatishlari va ularga kirishlari
                      mumkin, shuningdek, ular vaqt o'tishi bilan va turli
                      onlayn xizmatlar orqali to'playdigan foydalanuvchilar
                      haqidagi ma'lumotlarni to'plashlari yoki ularga kirishlari
                      mumkin.
                    </li>
                    <li className='leading tracking-normal'>
                      Uchinchi tomon hamkorlari: UzAnalitika.uz foydalanuvchilar
                      haqida qoʻshimcha ochiq maʼlumotlarni olish uchun uchinchi
                      tomon hamkorlari bilan foydalanuvchi maʼlumotlarini
                      almashishi mumkin.
                    </li>
                    <li className='leading tracking-normal'>
                      Biznesni o'tkazish: Ma'lumot har qanday taklif qilingan
                      qo'shilish, sotib olish, qarzni moliyalashtirish,
                      aktivlarni sotish yoki shunga o'xshash bitimda yoki
                      bankrotlik yoki to'lovga layoqatsiz bo'lgan taqdirda, har
                      qanday potentsial oluvchiga, merosxo'rga yoki boshqa
                      shaxsga berilishi mumkin. UzAnalitika.uz aktivlaridan biri
                      sifatida bir yoki bir nechta uchinchi shaxslarga
                      o‘tkaziladi.
                    </li>
                  </ol>
                </li>
                <li className='leading tracking-normal'>
                  UzAnalitika.uz o‘z foydalanuvchilarining ma’lumotlarini
                  O‘zbekiston Respublikasining amaldagi qonunchiligi talablariga
                  muvofiq va shu kabi boshqa hollarda oshkor qilishi mumkin.
                </li>
                <li className='leading tracking-normal'>
                  Shuningdek UzAnalitika.uz ma'lumotlar bilan quyidagilar uchun
                  bo'lishishi mumkin
                  <ul className='ml-6 mt-4 list-disc'>
                    <li className='leading tracking-normal'>
                      har qanday amaldagi qonun, qoidalar, huquqiy jarayon yoki
                      hukumat talabiga rioya qilish;
                    </li>
                    <li className='leading tracking-normal'>
                      ushbu Maxfiylik siyosati va Foydalanuvchi shartnomasini
                      qo'llash, shu jumladan ushbu Shartnomaning mumkin bo'lgan
                      buzilishlarini tekshirish;
                    </li>
                    <li className='leading tracking-normal'>
                      firibgarlik, xavfsizlik yoki texnik muammolarni aniqlash,
                      oldini olish yoki boshqacha tarzda hal qilish;
                    </li>
                    <li className='leading tracking-normal'>
                      foydalanuvchi so'rovlariga javob berish;
                    </li>
                    <li className='leading tracking-normal'>
                      UzAnalitika.uz, mulk, xavfsizlik, foydalanuvchilarimiz va
                      jamoatchilik huquqlarini himoya qilish. (Jumladan,
                      firibgarlik, zararli dasturlar va spamlardan himoya qilish
                      uchun boshqa kompaniya va tashkilotlar bilan ma'lumot
                      almashish);
                    </li>
                  </ul>
                </li>
                <li className='leading tracking-normal'>
                  Xizmat foydalanuvchining roziligi bilan ma'lumotlarni uzatishi
                  mumkin.
                </li>
              </ol>
            </li>
            <li className='leading tracking-normal'>
              <p className='mt-4 font-bold '>
                Shaxsiy ma'lumotlarni qayta ishlashning huquqiy asoslari
              </p>
              <ol className=' ml-6 mt-4 list-decimal'>
                <li className='leading tracking-normal'>
                  UzAnalitika.uz uchun yuqorida tavsiflangan shaxsiy
                  ma'lumotlarni to'plash va ulardan foydalanishning huquqiy
                  asoslari shaxsiy ma'lumotlarga va Xizmat ularni to'playdigan
                  o'ziga xos kontekstga bog'liq bo'ladi.
                </li>
                <li className='leading tracking-normal'>
                  Shu bilan birga, Xizmat qoidaga asosan shaxsiy ma'lumotlarni
                  faqat sizdan to'playdi:
                  <ul className='ml-6 mt-4 list-disc'>
                    <li className='leading tracking-normal'>
                      agar UzAnalitika.uz foydalanuvchi shartnomasi shartlarini
                      bajarish uchun shaxsiy ma'lumotlarga muhtoj bo'lsa;
                    </li>
                    <li className='leading tracking-normal'>
                      agar qayta ishlash UzAnalitika.uz ning qonuniy
                      manfaatlariga javob bersa va foydalanuvchilarning
                      huquqlari buzilmasa;
                    </li>
                    <li className='leading tracking-normal'>
                      agar Xizmat foydalanuvchining bunga roziligiga ega bo'lsa.
                    </li>
                  </ul>
                </li>
                <li className='leading tracking-normal'>
                  Xizmatimizdan foydalanish va ushbu Xizmatni taqdim etish uchun
                  zarur bo'lganda foydalanuvchilar bilan bog'lanish, masalan,
                  so'rovlaringizga javob berish, platformamizni
                  takomillashtirish, marketing faoliyatini amalga oshirish hamda
                  noqonuniy faoliyatni aniqlash yoki oldini olish maqsadida
                  UzAnalitika.uz qonuniy qiziqishga ega.
                </li>
                <li className='leading tracking-normal'>
                  Ba'zi hollarda UzAnalitika.uz foydalanuvchilarning shaxsiy
                  ma'lumotlarini to'plash bo'yicha qonuniy majburiyatga ega
                  bo'lishi mumkin yoki foydalanuvchilarning manfaatlarini yoki
                  boshqa shaxsning manfaatlarini himoya qilish uchun boshqa
                  shaxsiy ma'lumotlarni talab qilishi mumkin.
                </li>
                <li className='leading tracking-normal'>
                  Agar Xizmat sizdan qonun yoki ushbu Siyosat talablariga
                  muvofiq shaxsiy ma'lumotlarni taqdim etishingizni so'rasa,
                  Xizmat buni o'z vaqtida aniqlab beradi va sizning shaxsiy
                  ma'lumotlaringizni taqdim etish majburiy yoki majburiy
                  emasligi haqida sizga xabar beradi (shuningdek, sizga Agar
                  foydalanuvchi o'z shaxsiy ma'lumotlarini taqdim qilmasa,
                  yuzaga kelishi mumkin bo'lgan oqibatlar haqida aytiladi).
                </li>
              </ol>
            </li>
            <li className='leading tracking-normal'>
              <p className='mt-4 font-bold '>Uchinchi tomon xizmatlari</p>
              <ol className=' ml-6 mt-4 list-decimal'>
                <li className='leading tracking-normal'>
                  Foydalanuvchilar UzAnalitika.uz orqali boshqa uchinchi tomon
                  xizmatlaridan foydalanishlari mumkin, masalan,
                  <a className='mx-1 text-blue-500' href={wesiteLink}>
                    {wesiteLink}
                  </a>{' '}
                  web-saytidagi ushbu uchinchi tomon xizmatlariga havolalarni
                  bosish orqali. Xizmat ushbu uchinchi tomon xizmatlarining
                  maxfiylik siyosatlari va/yoki amaliyotlari uchun javobgar emas
                  va biz foydalanuvchilarni o'zlarining maxfiylik siyosatlarini
                  diqqat bilan o'qib chiqishlarini tavsiya qilamiz.
                </li>
              </ol>
            </li>
            <li className='leading tracking-normal'>
              <p className='mt-4 font-bold '>XAVFSIZLIK</p>
              <ol className=' ml-6 mt-4 list-decimal'>
                <li className='leading tracking-normal'>
                  UzAnalitika.uz sizning ma'lumotlaringizni himoya qilishga
                  harakat qiladi. Buning uchun Xizmat ma'lumotlarni ruxsatsiz
                  kirish, foydalanish yoki oshkor qilishdan himoya qilish uchun
                  mo'ljallangan turli texnologiyalar va xavfsizlik choralarini
                  qo'llaydi. Xizmat tomonidan qo'llaniladigan choralar
                  foydalanuvchining shaxsiy ma'lumotlarini qayta ishlash xavfiga
                  mos keladigan xavfsizlik darajasini ta'minlash uchun
                  mo'ljallangan. Biroq, Internetda mutloq xavfsizlik
                  kafolatlanmasligini unutmang.
                </li>
              </ol>
            </li>
            <li className='leading tracking-normal'>
              <p className='mt-4 font-bold '>Ma'lumotlarni saqlash</p>
              <ol className=' ml-6 mt-4 list-decimal'>
                <li className='leading tracking-normal'>
                  UzAnalitika.uz foydalanuvchilar tomonidan to‘plangan shaxsiy
                  ma’lumotlarni Xizmatga doimiy qonuniy biznes zarurati
                  tug‘ilganda (masalan, siz so‘ragan xizmatni taqdim etish yoki
                  amaldagi qonunchilik, soliq yoki buxgalteriya talablariga
                  rioya qilish uchun) saqlaydi.
                </li>
                <li className='leading tracking-normal'>
                  Agar Xizmat sizning shaxsiy ma'lumotlaringizni qayta ishlashga
                  qonuniy biznes ehtiyojiga ega bo'lmasa, UzAnalitika.uz uni
                  o'chiradi yoki anonimlashtiradi, yoki buning iloji bo'lmasa
                  (masalan, shaxsiy ma'lumotlaringiz zaxira arxivlarida
                  saqlanganligi sababli) u xavfsiz tarzda shaxsiy
                  ma'lumotlaringizni saqlaydi va uni o'chirish mumkin bo'lgunga
                  qadar keyingi foydalanishdan ajratadi.
                </li>
              </ol>
            </li>
            <li className='leading tracking-normal'>
              <p className='mt-4 font-bold '>KIRISH</p>
              <ol className=' ml-6 mt-4 list-decimal'>
                <li className='leading tracking-normal'>
                  Agar siz ro'yxatdan o'tgan foydalanuvchi bo'lsangiz,
                  Xizmatimizga kirish orqali (agar mavjud bo'lsa) yoki
                  <a
                    className='mx-1 text-blue-800'
                    href={`mailto:${contactEmail}`}
                  >
                    {contactEmail}
                  </a>{' '}
                  elektron pochta manziliga xat yuborish orqali Hisobingiz bilan
                  bog'liq ma'lumotlarga kirishingiz mumkin.
                </li>
                <li className='leading tracking-normal'>
                  Maxfiyligingiz va xavfsizligingizni himoya qilish uchun Xizmat
                  maʼlumotlaringizni yangilash yoki oʻchirishdan oldin
                  shaxsingizni tasdiqlash uchun ham oqilona choralar koʻrishi
                  mumkin. Siz taqdim etgan ma'lumotlar talofatdan tiklash
                  maqsadida oddiy biznes jarayonida amalga oshiriladigan zaxira
                  jarayonlariga muvofiq biz tomonidan vaqti-vaqti bilan
                  arxivlanishi yoki saqlanishi mumkin. Sizning
                  ma'lumotlaringizga kirish va tuzatish qobiliyatingiz vaqtincha
                  cheklanishi mumkin, agar kirish va tuzatish mumkin bo'lsa
                  quyidagi hollarda: UzAnalitika.uz ning qonuniy
                  majburiyatlarini bajarishiga to'sqinlik qilsa; UzAnalitika.uz
                  saytining da'volarni tekshirish, taqdim etish va
                  qo'llab-quvvatlash imkoniyatlariga to'sqinlik qilish; uchinchi
                  shaxs haqidagi shaxsiy ma'lumotlarning oshkor etilishiga olib
                  kelishi; yoki shartnomaning buzilishiga yoki UzAnalitika.uz
                  yoki uchinchi tomon- boshqa tijorat ma'lumotlarining oshkor
                  etilishiga olib kelsa.
                </li>
              </ol>
            </li>
            <li className='leading tracking-normal'>
              <p className='mt-4 font-bold '>
                Ma'lumotlarni himoya qilishni umumiy tartibga solishda
                foydalanuvchilarning ma'lumotlarni himoya qilish huquqlari
              </p>
              <ol className=' ml-6 mt-4 list-decimal'>
                <li className='leading tracking-normal'>
                  Agar siz shaxsiy ma'lumotlaringizni tuzatish, yangilash yoki
                  o'chirishni talab qilmoqchi bo'lsangiz, buni istalgan vaqtda
                  bizga{' '}
                  <a
                    className='mx-1 text-blue-800'
                    href={`mailto:${contactEmail}`}
                  >
                    {contactEmail}
                  </a>{' '}
                  elektron pochta orqali so'rov yuborish orqali qilishingiz
                  mumkin.
                </li>
                <li className='leading tracking-normal'>
                  Siz istalgan vaqtda biz yuboradigan marketing
                  kommunikatsiyalaridan voz kechish huquqiga egasiz. Biz sizga
                  yuboradigan reklama xatlaridagi “obunani bekor qilish” yoki
                  “bekor qilish” havolasini bosish orqali ushbu huquqdan
                  foydalanishingiz mumkin. Boshqa marketing
                  kommunikatsiyalaridan voz kechish uchun{' '}
                  <a
                    className='mx-1 text-blue-800'
                    href={`mailto:${contactEmail}`}
                  >
                    {contactEmail}
                  </a>
                  elektron pochta orqali biz bilan bog'laning.
                </li>
                <li className='leading tracking-normal'>
                  Siz shaxsiy ma'lumotlaringizni to'plash va ishlatish bo'yicha
                  ma'lumotlarni huquqni muhofaza qilish organiga shikoyat qilish
                  huquqiga egasiz. Qo'shimcha ma'lumot olish uchun mahalliy
                  ma'lumotlarni himoya qilish organiga murojaat qiling.
                </li>
                <li className='leading tracking-normal'>
                  Biz maʼlumotlarni himoya qilish boʻyicha oʻz maʼlumotlarini
                  himoya qilish huquqlaridan foydalanishni istagan shaxslardan
                  olgan barcha soʻrovlarga amaldagi qonunlar doirasida javob
                  beramiz.
                </li>
              </ol>
            </li>
            <li className='leading tracking-normal'>
              <p className='mt-4 font-bold '>Yosh cheklovlari</p>
              <ol className=' ml-6 mt-4 list-decimal'>
                <li className='leading tracking-normal'>
                  Xizmatlarni ro'yxatdan o'tkazish va ulardan foydalanish orqali
                  siz kamida 13 yoshga to'lganligingizni va mamlakatingizda
                  mustaqil ravishda shartnomalar tuzish imkonini beruvchi
                  tegishli yoshga yetganingizni tasdiqlaysiz. UzAnalitika.uz
                  bila turib 13 yoshgacha bo'lgan bolalardan ma'lumot olmaydi.
                  Agar bola ushbu Maxfiylik siyosatini buzgan holda bizga
                  shaxsiy ma'lumotlarni taqdim etganini bilsangiz, bu haqda
                  bizga{' '}
                  <a
                    className='mx-1 text-blue-800'
                    href={`mailto:${contactEmail}`}
                  >
                    {contactEmail}
                  </a>{' '}
                  elektron manziliga xabar berishingiz mumkin.
                </li>
              </ol>
            </li>
            <li className='leading tracking-normal'>
              <p className='mt-4 font-bold '>
                Ushbu maxfiylik siyosatiga o'zgartirishlar
              </p>
              <ol className=' ml-6 mt-4 list-decimal'>
                <li className='leading tracking-normal'>
                  Ushbu Maxfiylik siyosati vaqti-vaqti bilan o'zgarishi mumkin.
                  Ushbu Siyosatning joriy versiyasi bizning veb-saytimizning
                  tegishli sahifasida mavjud bo'ladi -
                  <a className='mx-1 text-blue-800' href={privacyPolicyLink}>
                    {privacyPolicyLink}
                  </a>
                  .
                </li>
              </ol>
            </li>
            <li className='leading tracking-normal'>
              <p className='mt-4 font-bold '>Xalqaro ma’lumotlarni uzatish</p>
              <ol className=' ml-6 mt-4 list-decimal'>
                <li className='leading tracking-normal'>
                  UzAnalitika.uz xizmati butun dunyo foydalanuvchilar uchun
                  mavjud. Xizmat shaxsiy ma'lumotlarni dastlab to'plangan
                  mamlakatdan boshqa mamlakatlarga o'tkazishi mumkin. Bu
                  mamlakatlarda foydalanuvchilar maʼlumotni dastlab taqdim etgan
                  mamlakat bilan bir xil maʼlumotlarni himoya qilish qonunlariga
                  ega boʻlmasligi mumkin. Xizmat sizning shaxsiy
                  ma'lumotlaringizni boshqa mamlakatlarga uzatganda, Xizmat
                  ushbu Maxfiylik siyosatida ta'riflanganidek, ushbu
                  ma'lumotlarni himoya qilishga intiladi.
                </li>
              </ol>
            </li>
            <li className='leading tracking-normal'>
              <p className='mt-4 font-bold '>Biz bilan bog'laning</p>
              <ol className=' ml-6 mt-4 list-decimal'>
                <li className='leading tracking-normal'>
                  Ushbu Maxfiylik siyosati bo'yicha savollaringiz yoki
                  xavotirlaringiz bo'lsa, iltimos, bizga{' '}
                  <a
                    className='mx-1 text-blue-800'
                    href={`mailto:${contactEmail}`}
                  >
                    {contactEmail}
                  </a>
                  elektron pochta orqali yuboring.
                </li>
              </ol>
            </li>
          </ol>
        </div>
      </div>
      <Footer1 />
    </>
  );
};

export default PrivacyPolicy;
