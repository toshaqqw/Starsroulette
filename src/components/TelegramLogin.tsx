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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?15";
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "true");
    script.setAttribute("data-auth-url", "");

    // @ts-ignore
    window.TelegramLoginWidget = {
      dataOnauth: (user: TelegramUser) => {
        onAuth(user);
      },
    };

    const container = containerRef.current;
    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }
  }, [botName, onAuth]);

  return <div ref={containerRef}></div>;
};

export default TelegramLogin;
