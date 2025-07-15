import React, { useEffect, useRef } from "react";

interface TelegramUser {
  id: string;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: string;
  hash: string;
}

interface TelegramLoginProps {
  botName: string;
  onAuth: (user: TelegramUser) => void;
}

const TelegramLogin: React.FC<TelegramLoginProps> = ({ botName, onAuth }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // @ts-ignore
    window.TelegramLoginWidget = {
      dataOnauth: (user: TelegramUser) => {
        onAuth(user);
      },
    };

    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?15";
    script.async = true;
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "true");
    script.setAttribute("data-auth-url", "");

    container.innerHTML = "";
    container.appendChild(script);

    return () => {
      if (container) {
        container.innerHTML = "";
      }
      // @ts-ignore
      delete window.TelegramLoginWidget;
    };
  }, [botName, onAuth]);

  return <div ref={containerRef}></div>;
};

export default TelegramLogin;
