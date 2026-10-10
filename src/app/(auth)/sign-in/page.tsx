'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const SingInPage = () => {
  const router = useRouter();
  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fromdata = new FormData(e.currentTarget);
    const user = Object.fromEntries(fromdata.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: '/',
    });
    if (error) {
      toast.error(error.message || 'সাইন ইন করা যায়নি!');
      return;
    }

    if (data) {
      toast.success('সফলভাবে সাইন ইন হয়েছে!');
      router.push('/');
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-green-700">সাইন ইন</h1>
      <p className="text-gray-500 text-[12px]">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset bg-[#f8faf9] border-gray-200 w-xs rounded-box border p-4">
          <label className="label text-gray-700">ইমেইল</label>
          <input
            name="email"
            type="email"
            className="input w-full bg-white text-gray-900"
            placeholder="Email"
            required
          />

          <label className="label text-gray-700">পাসওয়ার্ড</label>
          <input
            name="password"
            type="password"
            className="input w-full bg-white text-gray-900"
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="btn mt-4 w-full !border !border-green-700/30 !shadow-md !shadow-green-900/20 bg-[#07883f] text-white hover:bg-[#066c33]"
          >
            সাইন ইন করুন
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SingInPage;
