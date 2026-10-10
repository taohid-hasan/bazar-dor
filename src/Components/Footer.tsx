import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-[#dce3de] bg-[#fbfcfb]">
      <div className="mx-auto flex w-full flex-col items-center justify-between gap-2 px-4 py-5 text-sm text-[#53615a] md:flex-row md:px-10 lg:px-20">
        <p className="text-center md:text-left">
          বাজারের দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="text-center md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;