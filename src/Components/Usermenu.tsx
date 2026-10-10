'use client';
import toast from 'react-hot-toast';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

export default function UserMenu() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-200" />;
  }

  if (!session?.user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/sign-in"
          className="text-[15px] font-medium text-[#222] hover:text-green-700"
        >
          সাইন ইন
        </Link>

        <Link
          href="/sign-up"
          className="rounded-lg bg-[#07883f] px-4 py-2.5 text-[15px] font-medium text-white transition hover:bg-green-700 sm:px-5"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        tabIndex={0}
        className="btn btn-sm flex max-w-48 items-center gap-2 rounded-xl border border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#07883f] font-semibold text-white">
          {user.name?.charAt(0).toUpperCase() || 'U'}
        </span>

        <span className="max-w-24 truncate">{user.name || 'ব্যবহারকারী'}</span>

        <span aria-hidden="true">
          <ChevronDown
            aria-hidden="true"
            className="h-5 w-5 text-gray-500 transition-transform duration-200"
          />
        </span>
      </button>

      <ul
        tabIndex={0}
        className="dropdown-content z-[100] mt-3 w-64 rounded-xl border border-gray-200 bg-white p-3 text-sm shadow-xl"
      >
        <li className="mb-2 border-b border-gray-100 px-2 pb-3">
          <p className="font-semibold text-gray-800">
            {user.name || 'ব্যবহারকারী'}
          </p>

          <p className="mt-1 truncate text-xs text-gray-500">{user.email}</p>
        </li>

        <li>
          <Link
            href="/profile"
            className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            👤 প্রোফাইল
          </Link>
        </li>

        <li>
          <button
            type="button"
            className="w-full rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50"
            onClick={async () => {
              const { error } = await authClient.signOut();

              if (error) {
                toast.error('সাইন আউট করা যায়নি!');
                console.error('Sign out failed:', error);
                return;
              }

              toast.success('সফলভাবে সাইন আউট হয়েছে!');
              window.location.href = '/';
            }}
          >
            ↪ সাইন আউট
          </button>
        </li>
      </ul>
    </div>
  );
}
