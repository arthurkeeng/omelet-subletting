'use client';

import { Suspense } from "react";


export default function NotFoundPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>Page Not found</div>
    </Suspense>
  );
}
