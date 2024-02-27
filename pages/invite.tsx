import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const RedirectPage: React.FC<{ redirectTo: string }> = ({ redirectTo }) => {
  useEffect(() => {
    window.location.replace(redirectTo);
  }, [redirectTo]);

  return null;
};

ReactDOM.render(
  <RedirectPage redirectTo="https://discord.com/oauth2/authorize?client_id=1212120152338866216&permissions=8&scope=bot+applications.commands" />,
  document.getElementById('root')
);
