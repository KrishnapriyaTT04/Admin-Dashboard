import React from 'react';
import NavLogo from 'assets/images/whitew-Asset-4mdpi.png';

function Logo() {
  return (
    <div>
      <img src={NavLogo} alt="Inclips" loading="lazy" height={40} />
    </div>
  );
}

export default Logo;
