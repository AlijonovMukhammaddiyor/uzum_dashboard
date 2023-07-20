import Link from 'next/link';
import React from 'react';

const footerLinks = [
  {
    title: 'About',
    links: [
      { title: 'How it works', url: '/' },
      { title: 'Featured', url: '/' },
      { title: 'Partnership', url: '/' },
      { title: 'Bussiness Relation', url: '/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { title: 'Events', url: '/' },
      { title: 'Blog', url: '/' },
      { title: 'Podcast', url: '/' },
      { title: 'Invite a friend', url: "#ta'riflar" },
    ],
  },
  {
    title: 'Socials',
    links: [
      { title: 'YouTube', url: '/' },
      {
        title: 'Instagram',
        url: 'https://instagram.com/uzanalitika?igshid=MzNlNGNkZWQ4Mg==',
      },
      { title: 'Telegram', url: 'https://t.me/uzanalitika' },
      { title: 'Twitter', url: '/' },
    ],
  },
];

const Footer1 = () => {
  return (
    <footer className='text-black-100 mt-5 flex  flex-col border-t border-gray-100'>
      <div className='flex flex-wrap justify-between gap-5 px-6 py-10 max-md:flex-col sm:px-16'>
        <div className='flex flex-col items-start justify-start gap-6'>
          {/* <Image
            src={logo}
            alt='logo'
            width={118}
            height={18}
            className='object-contain'
          /> */}
          <p className='text-base text-gray-700'>All Rights Reserved &copy;</p>
        </div>

        <div className='flex w-full flex-1 flex-wrap gap-20 max-md:mt-10 md:justify-end'>
          {footerLinks.map((item) => (
            <div
              key={item.title}
              className='flex min-w-[170px] flex-col gap-6 text-base'
            >
              <h3 className='font-bold'>{item.title}</h3>
              <div className='flex flex-col gap-5'>
                {item.links.map((link) => (
                  <Link
                    key={link.title}
                    href={link.url}
                    className='text-gray-500'
                    target='_blank'
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-10 flex flex-wrap items-center justify-between border-t border-gray-100 px-6 py-10 sm:px-16'>
        <p>@2023 UzAnalitika. All rights reserved</p>

        <div className='flex flex-1 justify-center gap-10 max-sm:mt-4 sm:justify-end'>
          <Link href='/' className='text-gray-500'>
            Privacy & Policy
          </Link>
          <Link href='/' className='text-gray-500'>
            Terms & Condition
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer1;
