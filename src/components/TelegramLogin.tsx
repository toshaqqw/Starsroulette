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
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const hash = urlParams.get("hash");

    if (id && hash) {
      const user: TelegramUser = {
        id: urlParams.get("id")!,
        first_name: urlParams.get("first_name") || "",
        last_name: urlParams.get("last_name") || "",
        username: urlParams.get("username") || "",
        photo_url: urlParams.get("photo_url") || "",
        auth_date: urlParams.get("auth_date") || "",
        hash: urlParams.get("hash") || "",
      };

      onAuth(user);
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://telegram.org/js/telegram-widget.js?15";
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "true");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-auth-url", "https://твойдомен.сервер/telegram-auth");

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(script);
    }
  }, [botName, onAuth]);

  return <div ref={containerRef}></div>;
};

export default TelegramLogin;
