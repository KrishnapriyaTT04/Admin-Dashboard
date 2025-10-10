import React from 'react';
import NavLogo from 'assets/images/kloowhitelogo.png';

function Logo() {
  return (
    <div>
      <img src={NavLogo} alt="Kloo" loading="lazy" height={40} />
    </div>
  );
}

export default Logo;
