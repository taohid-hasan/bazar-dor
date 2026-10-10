import Card from './Card';

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: 'up' | 'down' | 'flat';
    pct: number;
  };
};

export default async function ALLproduct() {
  const res = await fetch(
    'https://openapi.programming-hero.com/api/bazardor/products',
    { cache: 'no-store' },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const data = await res.json();
  const products: Product[] = Array.isArray(data) ? data : [];

  return (
    <main className="mt-6 mb-4">
      <div>
        <div className="mb-[14px] flex items-center gap-3">
          <h1 className="text-[22px] font-bold text-[#111]">সব পণ্য</h1>

          <span className="text-[14px] text-gray-500">
            মোট {products.length}টি পণ্য দেখানো হচ্ছে
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(product => (
            <Card key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="rounded-[17px] bg-white p-8 text-center text-gray-500">
            কোনো পণ্যের তথ্য পাওয়া যায়নি।
          </div>
        )}
      </div>
    </main>
  );
}
