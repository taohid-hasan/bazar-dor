'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: 'up' | 'down' | 'flat';
    pct: number;
  };
}

export default function ProductSorting({ products }: { products: Product[] }) {
  const [sort, setSort] = useState('default');

  const toBanglaNum = (num: number | string) =>
    String(num).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[Number(d)]);

  const safeProducts = Array.isArray(products) ? products : [];

  const sortedProducts = [...safeProducts].sort((a, b) => {
    if (sort === 'low') return a.today - b.today;
    if (sort === 'high') return b.today - a.today;
    return 0;
  });

  return (
    <>
      <div className="mb-6 flex justify-end">
        <div className="relative inline-block">
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="appearance-none rounded-xl border border-gray-200 bg-white py-2 pl-4 pr-10 text-sm text-gray-800 outline-none focus:border-green-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {sortedProducts.map(product => (
          <Link
            key={product.id || product.slug}
            href={`/products/${product.id}`}
            className="rounded-xl border border-gray-200 bg-white p-2 transition hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">
                {product.image || product.categoryIcon}
              </span>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {product.nameBn}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  প্রতি {product.unit === 'kg' ? 'কেজি' : product.unit}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-2">
              <div className="mt-6">
                <p className="text-sm text-gray-500">আজকের দাম</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {toBanglaNum(product.today)} টাকা
                </p>
              </div>

              <div className="mt-3">
                {product.change.dir === 'up' && (
                  <span className="font-semibold text-red-500">
                    ▲ {toBanglaNum(Math.abs(product.change.pct))}%
                  </span>
                )}

                {product.change.dir === 'down' && (
                  <span className="font-semibold text-green-500">
                    ▼ {toBanglaNum(Math.abs(product.change.pct))}%
                  </span>
                )}

                {product.change.dir === 'flat' && (
                  <span className="font-semibold text-gray-500">— ০%</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
