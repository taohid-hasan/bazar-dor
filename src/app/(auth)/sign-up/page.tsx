'use client';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';
const SingUpPage = () => {
  const router = useRouter();
  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fromdata = new FormData(e.currentTarget);
    const user = Object.fromEntries(fromdata.entries()) as {
      name: string;
      email: string;
      image: string;
      password: string;
    };

    const { data, error } = await authClient.signUp.email({
      ...user,
      callbackURL: '/',
    });

    if (error) {
      toast.error(error.message || 'অ্যাকাউন্ট তৈরি করা যায়নি!');
      return;
    }

    if (data) {
      toast.success('সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে!');
      router.push('/');
      redirect('/');
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-green-700">
        অ্যাকাউন্ট তৈরি করুন
      </h1>
      <p className="text-gray-500 text-[12px]">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      <form onSubmit={onSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 w-xs rounded-box border p-4">
          <label className="label">নাম</label>
          <input
            name="name"
            type="text"
            className="input w-full"
            placeholder="Name"
          />

          <label className="label">ইমেইল</label>
          <input
            name="email"
            type="email"
            className="input w-full"
            placeholder="Email"
          />

          <label className="label">পাসওয়ার্ড</label>
          <input
            name="password"
            type="password"
            className="input w-full"
            placeholder="Password"
          />

          <button
            type="submit"
            className="btn mt-4 w-full bg-green-600 text-white hover:bg-green-700"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SingUpPage;
