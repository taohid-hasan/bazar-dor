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

export default async function ProductDown() {
  const res = await fetch(
    'https://openapi.programming-hero.com/api/bazardor/products',
  );

  const data = await res.json();
  const products: Product[] = data;

  const decreasedProducts = products
    .filter(product => product.change?.dir === 'down')
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <main className="mt-6">
      <div>
        <div className="mb-[14px] flex items-center gap-2">
          <span className="text-[18px] text-green-600">▼</span>

          <h1 className="text-[22px] font-bold text-[#111]">আজ দাম কমেছে</h1>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {decreasedProducts.map(product => (
            <Card key={product.id} product={product} />
          ))}
        </div>

        {decreasedProducts.length === 0 && (
          <div className="rounded-[17px] bg-white p-8 text-center text-gray-500">
            কোনো পণ্যের দাম কমা পাওয়া যায়নি।
          </div>
        )}
      </div>
    </main>
  );
}
