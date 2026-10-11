import { Suspense } from 'react';
import ALLproduct from '@/Components/ALLproduct';

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ALLproduct />
    </Suspense>
  );
}
