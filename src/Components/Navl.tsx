import Link from 'next/link';

interface Navs {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navl = async () => {
  const res = await fetch(
    //  "https://api.api-store.workers.dev/api/bazardor/categories"
    'https://api.abcz.workers.dev/api/bazardor/categories',
  );

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  const data: Navs[] = await res.json();

  return (
    <nav className="mt-1 flex w-full pt-3 px-1">
      {data.map(n => (
        <Link
          key={n.id}
          href={`/category/${n.slug}`}
          className="flex shrink-0 items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 transition hover:text-green-600"
        >
          <span>{n.icon}</span>
          <span>{n.nameBn}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navl;
