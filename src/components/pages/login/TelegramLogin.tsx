import React, { useEffect, useRef } from 'react';
declare global {
  interface Window {
    onTelegramAuth: (user: any) => void;
  }
}

const TelegramLogin = () => {
  const ref = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', 'uzanalitikabot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-request-access', 'write');
    script.async = true;
    document.body.appendChild(script);

    window.onTelegramAuth = (user) => {
      console.log(user);
    };

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
  }, []);

  return <div ref={ref} />;
};

export default TelegramLogin;
