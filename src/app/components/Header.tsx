import logo from '../assets/img/logo.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white flex justify-between py-5 items-center">
      <Link href="/accueil" className="logo-container">
        <Image src={logo} alt="logo safeout" />
      </Link>
      <Link href="/contact" className="demo-container">
        <button className="bg-gradient-to-l from-btn-purple-light to-btn-purple px-5 py-2 font-bold rounded-[4px]">
          Book your demo
        </button>
      </Link>
    </header>
  );
}
