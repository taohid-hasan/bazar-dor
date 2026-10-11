export default function Loading() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-8">
      <div className="mb-8">
        <div className="h-7 w-40 animate-pulse rounded-lg bg-gray-200" />
        <div className="mt-3 h-4 w-56 animate-pulse rounded bg-gray-100" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="flex h-40 items-center justify-center rounded-xl bg-gray-100">
              <div className="h-16 w-16 animate-pulse rounded-full bg-gray-200" />
            </div>

            <div className="mt-5 h-5 w-3/4 animate-pulse rounded bg-gray-200" />

            <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-gray-100" />

            <div className="mt-5 flex items-center justify-between">
              <div className="h-7 w-24 animate-pulse rounded-lg bg-green-100" />
              <div className="h-8 w-20 animate-pulse rounded-lg bg-gray-100" />
            </div>

            <div className="mt-5 h-10 w-full animate-pulse rounded-xl bg-green-100" />
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <span className="h-3 w-3 animate-bounce rounded-full bg-green-600" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-green-600 [animation-delay:150ms]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-green-600 [animation-delay:300ms]" />
        <p className="ml-2 text-sm text-gray-500">পণ্যের তথ্য লোড হচ্ছে...</p>
      </div>
    </main>
  );
}
