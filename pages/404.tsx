// pages/404.tsx
'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Custom404Page() {
  const params = useSearchParams();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Your custom 404 content */}
      <div>
        <h1>404 - Page Not Found</h1>
        {params ? <p>Search Params: {params.toString()}</p> : null}
      </div>
    </Suspense>
  );
}
