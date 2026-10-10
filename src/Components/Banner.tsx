import Image from 'next/image';
import Link from 'next/link';
const data = new Date().toLocaleDateString('bn-BD', {
  dateStyle: 'full',
});
const Hero = () => {
  return (
    <section className="px-2">
      <div className="mx-auto flex min-h-[388px] items-center justify-between overflow-hidden rounded-[24px] border border-[#dce5df] bg-white px-5 py-8 sm:px-8 lg:px-4 mt-4">
        <div className="max-w-[620px]">
          <div className="mb-4 inline-flex rounded-full bg-[#e4f4ea] px-3 py-1 text-[14px] font-medium text-[#07883f]">
            {data}
          </div>

          <h1 className="max-w-[560px] text-[34px] font-bold leading-[1.25] text-[#111] sm:text-[40px] lg:text-[42px]">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 max-w-[600px] text-[16px] leading-[1.55] text-[#666]">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক ও
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="/allproducts"
            className="mt-5 inline-block rounded-lg bg-[#07883f] px-5 py-2.5 text-[15px] font-semibold text-white shadow-md transition hover:bg-[#067536]"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        <div className="hidden items-center justify-center lg:flex lg:w-[360px]">
          <Image
            src="/bazar-hero.png"
            alt="/bazar-hero.png"
            width={400}
            height={400}
            priority
            className="h-auto w-90 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
