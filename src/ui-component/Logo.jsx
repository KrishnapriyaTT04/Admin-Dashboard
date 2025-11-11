import React from 'react';
import NavLogo from 'assets/images/logo.svg';

function Logo() {
  return (
    <div>
      <img src={NavLogo} alt="Kloo" loading="lazy" height={60} />
    </div>
  );
}

export default Logo;
