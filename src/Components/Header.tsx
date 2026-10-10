
import Image from 'next/image';
import Navl from './Navl';
import Link from 'next/link';
import UserMenu from './Usermenu';

const Header = () => {
  const data = new Date().toLocaleDateString('bn-BD', {
    dateStyle: 'full',
  });

  return (
    <header className="sticky top-0 z-50 w-full border-t border-orange-100 pt-3 bg-[#f8faf9]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-1 sm:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex gap-2 p-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#07883f]">
              <Image
                src="/logo-icon.png"
                alt="বাজারের দর"
                width={50}
                height={50}
                priority
                className="h-6 w-6 object-contain brightness-0 invert"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-[21px] font-bold leading-[24px] text-[#202020]">
                {' '}
                বাজারের দর{' '}
              </h1>
              <p className="text-[12px] leading-[18px] text-gray-500">{data}</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <UserMenu />
        </div>
      </div>

      <div className="mx-auto max-w-7xl border-t border-gray-200">
        <Navl />
      </div>
      <div></div>
    </header>
  );
};

export default Header;
