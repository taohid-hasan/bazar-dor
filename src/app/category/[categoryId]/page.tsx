import ProductSorting from './ProductSorting';
interface Product {
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
}

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const res = await fetch(
    'https://openapi.programming-hero.com/api/bazardor/products',
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data: Product[] = await res.json();

  const products = data.filter(item => item.category === categoryId);

  if (products.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-center text-gray-500">কোনো পণ্য পাওয়া যায়নি।</p>
      </main>
    );
  }

  const category = products[0];

  const toBanglaNum = (num: number | string) => {
    return String(num).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[Number(d)]);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-3xl">
            {category.categoryIcon}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {category.categoryNameBn}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {toBanglaNum(products.length)} টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        <div className="mt-4 border-t border-gray-100 pt-3">
          <p className="text-sm text-gray-500">
            মোট{' '}
            <span className="font-semibold text-gray-700">
              {toBanglaNum(products.length)}
            </span>{' '}
            টি পণ্য দেখানো হচ্ছে
          </p>
        </div>
      </div>

      <ProductSorting products={products} />

      {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
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
                  প্রতি{" "}
                  {product.unit === "kg"
                    ? "কেজি"
                    : product.unit}
                </p>
              </div>
            </div>

           
            <div className="flex items-center justify-between p-2">
              <div className="mt-6">
                <p className="text-sm text-gray-500">
                  আজকের দাম
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {toBanglaNum(product.today)} টাকা
                </p>
              </div>

              <div className="mt-3">
                {product.change.dir === "up" && (
                  <span className="font-semibold text-red-500">
                    ▲{" "}
                    {toBanglaNum(
                      Math.abs(product.change.pct)
                    )}
                    %
                  </span>
                )}

                {product.change.dir === "down" && (
                  <span className="font-semibold text-green-500">
                    ▼{" "}
                    {toBanglaNum(
                      Math.abs(product.change.pct)
                    )}
                    %
                  </span>
                )}

                {product.change.dir === "flat" && (
                  <span className="font-semibold text-gray-500">
                    — ০%
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div> */}
    </main>
  );
};

export default CategoryPage;
