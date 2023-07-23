import TelegramLoginButton from 'react-telegram-login';

const handleTelegramResponse = (response: any) => {
  console.log(response);
};

export default function TelegramLogin() {
  return (
    <TelegramLoginButton
      dataOnauth={handleTelegramResponse}
      botName='uzanalitikabot'
    />
  );
}
