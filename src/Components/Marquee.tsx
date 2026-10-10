import MarqueeText from 'react-marquee-text';

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  unit: string;
  today: number;
  change: {
    dir: 'up' | 'down' | 'flat';
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch(
    // "https://api.api-store.workers.dev/api/bazardor/products?category=chal"
    // "https://api.api-store.workers.dev/api/bazardor/products"
    'https://api.abcz.workers.dev/api/bazardor/products',
    
  );

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data: Product[] = await res.json();

  const marqueeData = [...data, ...data, ...data];

  return (
    <div className="w-full  overflow-hidden border-y border-gray-200 bg-white">
      <div>
        <MarqueeText
          direction="right"
          duration={10}
          className="py-1 text-sm"
          pauseOnHover={true}
        >
          {marqueeData.map((product, index) => (
            <span
              key={`${product.id}-${index}`}
              className="mx-1 inline-flex items-center whitespace-nowrap"
            >
              <span className="text-gray-700">{product.nameBn}</span>

              <span className="ml-1 text-gray-700">
                {product.today} টাকা/{product.unit}
              </span>

              <span
                className={`ml-1 ${
                  product.change.dir === 'up'
                    ? 'text-red-500'
                    : product.change.dir === 'down'
                      ? 'text-green-600'
                      : 'text-gray-500'
                }`}
              >
                {product.change.dir === 'up'
                  ? '▲'
                  : product.change.dir === 'down'
                    ? '▼'
                    : '—'}{' '}
                {product.change.pct > 0
                  ? `+${product.change.pct}%`
                  : `${product.change.pct}%`}
              </span>

              <span className="ml-5 text-gray-300">•</span>
            </span>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;
