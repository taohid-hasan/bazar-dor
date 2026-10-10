'use client';

import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [signingOut, setSigningOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignOut = async () => {
    setSigningOut(true);
    setErrorMessage('');

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || 'সাইন আউট করা যায়নি।');
        return;
      }

      toast.success('সফলভাবে সাইন আউট হয়েছে!');
      router.replace('/singin');
      router.refresh();
    } catch {
      setErrorMessage('সাইন আউট করতে সমস্যা হয়েছে।');
    } finally {
      setSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#f0f5f0] px-4">
        <div className="rounded-xl bg-white p-6 text-center shadow-sm">
          <p className="text-gray-600">প্রোফাইল লোড হচ্ছে...</p>
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#f0f5f0] px-4 py-8">
        <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">সাইন ইন প্রয়োজন</h1>
          <p className="mt-2 text-sm text-gray-600">
            প্রোফাইল দেখতে আগে সাইন ইন করুন।
          </p>
          <button
            type="button"
            onClick={() => router.push('/sign-in')}
            className="mt-5 min-h-11 w-full rounded-lg bg-green-700 px-4 py-2 font-semibold text-white hover:bg-green-800"
          >
            সাইন ইন করুন
          </button>
        </section>
      </main>
    );
  }

  const user = session.user;

  return (
    <main className="min-h-dvh bg-[#f0f5f0] px-3 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-6 sm:mb-8">
          <p className="text-sm font-medium text-green-700">আপনার অ্যাকাউন্ট</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
            আমার প্রোফাইল
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
            আপনার অ্যাকাউন্টের তথ্য দেখুন এবং প্রয়োজন অনুযায়ী আপডেট করুন।
          </p>
        </header>

        {errorMessage && (
          <p
            role="alert"
            className="mb-4 break-words rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {errorMessage}
          </p>
        )}

        <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-6">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            {user.image ? (
              <Image
                src={user.image}
                alt="Profile"
                width={64}
                height={64}
                unoptimized
                className="h-14 w-14 shrink-0 rounded-full border border-gray-200 object-cover sm:h-16 sm:w-16"
              />
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-700 text-2xl font-bold text-white sm:h-16 sm:w-16">
                {(user.name || user.email || 'U').charAt(0).toUpperCase()}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h2 className="break-words text-lg font-semibold text-gray-900 sm:text-xl">
                {user.name || 'ব্যবহারকারী'}
              </h2>
              <p className="mt-1 break-all text-sm text-gray-600">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="min-h-10 w-full rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {signingOut ? 'সাইন আউট হচ্ছে...' : '↪ সাইন আউট'}
          </button>
        </section>

        <ProfileNameForm key={user.id} initialName={user.name || ''} />

        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="min-h-10 rounded-lg px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-100"
          >
            ← হোম পেজে ফিরে যান
          </button>
        </div>
      </div>
    </main>
  );
};

function ProfileNameForm({ initialName }: { initialName: string }) {
  const router = useRouter();

  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdateName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage('');
    setErrorMessage('');

    const updatedName = name.trim();

    if (!updatedName) {
      setErrorMessage('নাম লিখুন।');
      return;
    }

    if (updatedName.length > 100) {
      setErrorMessage('নাম সর্বোচ্চ ১০০ অক্ষরের হতে পারবে।');
      return;
    }

    setSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: updatedName,
      });

      if (error) {
        setErrorMessage(error.message || 'নাম আপডেট করা যায়নি।');
        return;
      }

      setName(updatedName);
      setMessage('আপনার নাম সফলভাবে আপডেট হয়েছে।');
      router.refresh();
    } catch {
      setErrorMessage('কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:mt-6 sm:p-6">
      <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
        নাম হালনাগাদ করুন
      </h2>

      <p className="mt-1 text-sm leading-6 text-gray-500">
        আপনার প্রোফাইলের নাম পরিবর্তন করুন।
      </p>

      <form onSubmit={handleUpdateName} className="mt-5">
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-800"
        >
          নাম
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={e => {
            setName(e.target.value);
            setMessage('');
            setErrorMessage('');
          }}
          required
          maxLength={100}
          autoComplete="name"
          placeholder="আপনার নাম লিখুন"
          className="min-h-11 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 sm:text-base"
        />

        {errorMessage && (
          <p role="alert" className="mt-3 text-sm text-red-600">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={saving || !name.trim()}
          className="mt-4 min-h-11 w-full rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-48 sm:text-base"
        >
          {saving ? 'আপডেট হচ্ছে...' : 'নাম হালনাগাদ করুন'}
        </button>

        {message && (
          <p
            role="status"
            className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700"
          >
            ✓ {message}
          </p>
        )}
      </form>
    </section>
  );
}

export default ProfilePage;
