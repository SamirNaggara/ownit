import Image from 'next/image';
import intersectImg from '../../assets/img/intersect.png';
import Header from '@/app/components/Header';

// interface at the end
export function Rectangle({ text }: RectangleProps) {
  return (
    <div className="bg-white/.43 backdrop-blur border-solid border-2 border-span-purple w-[292px] h-[243px] flex justify-center items-center text-center rounded-[15px]">
      <p className="max-w-[80%]">{text}</p>
    </div>
  );
}

export default function S_hero() {
  return (
    <div className="bg-white minh-screen px-[10%] relative overflow-hidden">
      <Image
        className="absolute top-[145px] right-[95px] w-[95%] z-0 2xl:top-[180px] xl:top-[340px] lg:top-[420px] md:top-[550px] sm:max-md:hidden max-sm:hidden"
        src={intersectImg}
        alt="background image"
      />
      <Header />
      <h1 className="font-bold text-black text-[57px] text-center mt-[5%] z-10">
        Make your items <br className="invisible" />
        <span className="bg-gradient-to-l from-span-purple-light to-span-purple inline-block text-transparent bg-clip-text">
          really
        </span>{' '}
        yours.
      </h1>
      <div className="text-black text-2xl font-bold flex flex-wrap justify-center gap-[15%] py-[8%] mt-[8%] space-y-4">
        <Rectangle text="Item Authentication" />
        <Rectangle text="Instant Status Verification" />
        <Rectangle text="Ultimate item Experience" />
      </div>
    </div>
  );
}

interface RectangleProps {
  text: string;
}
