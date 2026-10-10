import Link from 'next/link';

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

type CardProps = {
  product: Product;
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

const Card = ({ product }: CardProps) => {
  const isUp = product.change.dir === 'up';
  const isDown = product.change.dir === 'down';

  return (
    <Link href={`/products/${product.id}`} className="block">
      <div
        className="
          min-h-[138px]
          rounded-[17px]
          border
          border-[#dce3de]
          bg-white
          p-4
          flex
          flex-col
          justify-between
          cursor-pointer
          transition
          hover:shadow-md
        "
      >
        <div className="flex items-center gap-[13px]">
          <div
            className="
              flex
              h-[47px]
              w-[47px]
              shrink-0
              items-center
              justify-center
              rounded-[12px]
              bg-[#f0f5f1]
              text-[25px]
            "
          >
            {product.image}
          </div>

          <div>
            <div className="text-[17px] font-bold leading-tight text-[#111]">
              {product.nameBn}
            </div>

            <div className="mt-[3px] text-[13px] text-[#777]">
              {getUnit(product.unit)}
            </div>
          </div>
        </div>

        <div className="mt-2">
          <div className="mb-[1px] text-[13px] text-[#777]">আজকের দাম</div>

          <div className="flex items-center justify-between">
            <div className="text-[20px] font-bold text-[#111]">
              {banglaNumber(product.today)} টাকা
            </div>

            <div
              className={`
                rounded-full
                px-[10px]
                py-[4px]
                text-[12px]
                whitespace-nowrap
                ${
                  isUp
                    ? 'bg-[#f2f7f3] text-[#e33445]'
                    : isDown
                      ? 'bg-[#f2f7f3] text-green-600'
                      : 'bg-gray-100 text-gray-500'
                }
              `}
            >
              <span className="mr-[2px] text-[10px]">
                {isUp ? '▲' : isDown ? '▼' : '—'}
              </span>
              {banglaNumber(product.change.pct)}%
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
