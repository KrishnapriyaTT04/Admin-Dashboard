import React, { lazy } from 'react';

const NopageFound = lazy(() => import('ui-component/common/no-page/NoPage'));

function index() {
  return (
    <div>
      <NopageFound />
    </div>
  );
}

export default index;
