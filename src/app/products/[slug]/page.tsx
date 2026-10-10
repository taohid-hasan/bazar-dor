import Link from 'next/link';

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

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
  markets: Market[];
};

function banglaNumber(value: number | string) {
  const banglaDigits = '০১২৩৪৫৬৭৮৯';

  return String(value).replace(/\d/g, digit => banglaDigits[Number(digit)]);
}

function getUnit(unit: string) {
  switch (unit) {
    case 'kg':
      return 'প্রতি কেজি';
    case 'litre':
      return 'প্রতি লিটার';
    case 'dozen':
      return 'প্রতি ডজন';
    case 'piece':
      return 'প্রতি পিস';
    default:
      return `প্রতি ${unit}`;
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${slug}`,
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center">
        <h1 className="text-xl font-bold text-gray-600">পণ্য পাওয়া যায়নি</h1>
      </main>
    );
  }

  const product: Product = await res.json();

  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';

  const lowestMarket = product.markets.reduce((prev, current) =>
    current.min < prev.min ? current : prev,
  );

  const highestMarket = product.markets.reduce((prev, current) =>
    current.max > prev.max ? current : prev,
  );

  const averagePrice =
    product.markets.reduce((total, item) => {
      return total + (item.min + item.max) / 2;
    }, 0) / product.markets.length;

  return (
    <main className="bg-[#f8faf8] px-[20px] py-8 sm:px-[30px]">
      <div className="mx-auto mb-6 flex max-w-6xl items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-green-600">
          হোম
        </Link>

        <span>›</span>

        <Link
          href={`/category/${product.category}`}
          className="hover:text-green-600"
        >
          {product.categoryNameBn}
        </Link>

        <span>›</span>

        <span className="text-gray-900">{product.nameBn}</span>
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="rounded-[20px] border border-[#dce3de] bg-white p-6">
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div
                className="
          flex
          h-[70px]
          w-[70px]
          shrink-0
          items-center
          justify-center
          rounded-[16px]
          bg-[#f0f5f1]
          text-[38px]
        "
              >
                {product.image}
              </div>

              <div>
                <h1 className="text-[26px] font-bold text-[#111]">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-[14px] text-gray-500">
                  {product.unit === 'dozen'
                    ? 'প্রতি ডজন'
                    : getUnit(product.unit)}{' '}
                  · {product.categoryNameBn || 'ডিম-দুধ'}
                </p>

                <p className="mt-2 text-[14px] text-gray-600">
                  গতকালের তুলনায় আজ দাম{' '}
                  <span
                    className={
                      isUp
                        ? 'font-bold text-[#df3545]'
                        : isDown
                          ? 'font-bold text-green-600'
                          : 'font-bold text-gray-500'
                    }
                  >
                    {isUp ? 'বেড়েছে' : isDown ? 'কমেছে' : 'অপরিবর্তিত'}
                  </span>{' '}
                  {banglaNumber(product.change?.pct ?? 0)}%
                </p>
              </div>
            </div>

            <div className="shrink-0 rounded-[16px] bg-[#f0f5f1] px-5 py-4 text-center">
              <p className="text-[13px] text-gray-500">আজকের দাম</p>

              <p className="mt-1 text-[30px] font-bold text-[#111]">
                {banglaNumber(product.today)}
              </p>

              <p className="text-[13px] text-gray-500">
                টাকা / {product.unit === 'kg' ? 'কেজি' : product.unit}
              </p>

              <p
                className={`mt-1 text-sm font-semibold ${
                  isUp
                    ? 'text-[#df3545]'
                    : isDown
                      ? 'text-green-600'
                      : 'text-gray-500'
                }`}
              >
                {isUp ? '▲' : isDown ? '▼' : '—'}{' '}
                {banglaNumber(product.change?.pct ?? 0)}%
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="mb-4 text-[22px] font-bold text-[#111]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-[17px] border border-[#dce3de] bg-white p-5">
              <p className="text-[14px] text-gray-500">সর্বনিম্ন দাম</p>

              <p className="mt-2 text-[25px] font-bold text-[#2ae242]">
                {banglaNumber(lowestMarket.min)} টাকা
              </p>

              <p className="mt-1 text-[13px] text-gray-500">
                সবচেয়ে কম দামের বাজার
              </p>

              <p className="mt-1 text-[14px] font-semibold text-[#111]">
                {lowestMarket.market}
              </p>
            </div>

            <div className="rounded-[17px] border border-[#dce3de] bg-white p-5">
              <p className="text-[14px] text-gray-500">সর্বাধিক দাম</p>

              <p className="mt-2 text-[25px] font-bold text-[#a12626]">
                {banglaNumber(highestMarket.max)} টাকা
              </p>

              <p className="mt-1 text-[13px] text-gray-500">
                সবচেয়ে বেশি দামের বাজার
              </p>

              <p className="mt-1 text-[14px] font-semibold text-[#111]">
                {highestMarket.market}
              </p>
            </div>

            <div className="rounded-[17px] border border-[#dce3de] bg-white p-5">
              <p className="text-[14px] text-gray-500">গড় দাম</p>

              <p className="mt-2 text-[25px] font-bold text-[#6ddd5e]">
                {banglaNumber(averagePrice.toFixed(2))} টাকা
              </p>

              <p className="mt-1 text-[13px] text-gray-500">
                {getUnit(product.unit)}-এর হিসাবে
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-[22px] font-bold text-[#111]">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-[17px] border border-[#dce3de] bg-white">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-[#f7faf7]">
                  <th className="px-5 py-4 text-left font-semibold text-[#111]">
                    বাজার
                  </th>

                  <th className="px-5 py-4 text-left font-semibold text-[#111]">
                    বিভাগ
                  </th>

                  <th className="px-5 py-4 text-right font-semibold text-[#111]">
                    সর্বনিম্ন
                  </th>

                  <th className="px-5 py-4 text-right font-semibold text-[#111]">
                    সর্বাধিক
                  </th>

                  <th className="px-5 py-4 text-right font-semibold text-[#111]">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {product.markets.map(market => {
                  const average = (market.min + market.max) / 2;

                  return (
                    <tr
                      key={market.market}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="px-5 py-4 font-semibold text-[#111]">
                        {market.market}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {market.division}
                      </td>

                      <td className="px-5 py-4 text-right text-gray-700">
                        {banglaNumber(market.min)} টাকা
                      </td>

                      <td className="px-5 py-4 text-right text-gray-700">
                        {banglaNumber(market.max)} টাকা
                      </td>

                      <td className="px-5 py-4 text-right font-semibold text-[#111]">
                        {banglaNumber(average.toFixed(2))} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center pb-6">
        <Link
          href={`/category/${product.category}`}
          className="flex items-center gap-2 rounded-xl bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-700"
        >
          <span>{product.categoryIcon}</span>
          সব {product.categoryNameBn}
        </Link>
      </div>
    </main>
  );
}
