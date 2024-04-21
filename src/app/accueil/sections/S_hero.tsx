import { intersectImg } from '../../../../public';
import { CSSProperties } from 'react'; // Import CSSProperties type

export function Rectangle({ text }: RectangleProps) {
  return (
    <div className="bg-white/.43 backdrop-blur border-solid border-2 border-span-purple w-[292px] h-[243px] flex justify-center items-center text-center rounded-[15px]">
      <p className="max-w-[80%]">{text}</p>
    </div>
  );
}

export default function S_hero() {
  const backgroundStyle: CSSProperties = {
    backgroundImage: `url(${intersectImg.src})`, // Convert intersectImg to URL string
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    backgroundColor: 'white',
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0" style={backgroundStyle}></div>{' '}
      {/* Background Image */}
      <div className="absolute inset-0"></div> {/* White background */}
      <div className="min-h-screen px-[10%] relative overflow-hidden z-10">
        <h1 className="font-bold text-black text-[57px] text-center mt-[5%]">
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
    </div>
  );
}

interface RectangleProps {
  text: string;
}
