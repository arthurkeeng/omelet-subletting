


import React, { Suspense } from 'react';

export default function Custom404Page() {


  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Your custom 404 content */}
      <div>
        <h1>404 - Page Not Found</h1>
      </div>
    </Suspense>
  );
}
