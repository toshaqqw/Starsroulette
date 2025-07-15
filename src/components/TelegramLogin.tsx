import React, { useEffect } from "react";

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
  useEffect(() => {
    // @ts-ignore
    window.TelegramLoginWidget = {
      dataOnauth: (user: TelegramUser) => {
        onAuth(user);
      },
    };
  }, [onAuth]);

  return (
    <div>
      <script
        async
        src="https://telegram.org/js/telegram-widget.js?15"
        data-telegram-login={botName}
        data-size="large"
        data-userpic="true"
        data-auth-url=""
      ></script>
    </div>
  );
};

export default TelegramLogin;
