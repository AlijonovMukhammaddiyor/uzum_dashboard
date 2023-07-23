import React, { useEffect, useRef } from 'react';
declare global {
  interface Window {
    onTelegramAuth: (user: any) => void;
  }
}

const TelegramLogin = ({
  onTelegramAuth,
}: {
  onTelegramAuth: (user: any) => void;
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', 'uzanalitikabot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-request-access', 'write');
    window.onTelegramAuth = onTelegramAuth;
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.async = true;
    document.body.appendChild(script);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const node = mutation.addedNodes[0];
          if (
            node instanceof Element &&
            node.tagName.toLowerCase() === 'iframe'
          ) {
            (ref.current as any)?.appendChild(node);
            observer.disconnect();
          }
        }
      });
    });

    observer.observe(document.body, { childList: true });

    return () => {
      observer.disconnect();
      script.remove();
      window.onTelegramAuth = () =>
        console.log('Telegram login script removed');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onTelegramAuth, typeof window]);

  return (
    <div
      ref={ref}
      className='flex w-full items-center justify-center bg-transparent'
    />
  );
};

export default TelegramLogin;
