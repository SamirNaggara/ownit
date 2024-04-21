import Link from 'next/link';
import Image from 'next/image';
import {
  logoWhite,
  shapeOne,
  shapeTwo,
  watch,
  arrow,
  polygon,
  nftLight,
  shield,
} from '../../../../public';

export default function S_auth() {
  return (
    <div className="minh-screen px-[10%] bg-gradient-home">
      <div className="flex items-center justify-center gap-20 flex-wrap py-[8%]">
        <div className="containerLeft">
          <div className="relative">
            <div className="bg-white/[.44] border-[1px] border-solid border-white rounded-[15px] backdrop-blur-lg flex flex-col items-center justify-center gap-10 py-[15%] px-6 relative z-10">
              {' '}
              <h2 className="text-[28px] font-bold w-[80%] text-center">
                {"It's not authentic without its digital identity"}
              </h2>
              <div className="flex items-center gap-10 flex-wrap justify-center">
                <div className="bg-white rounded-[15px] relative h-44 w-36 flex justify-center items-center">
                  <Image src={watch} alt="watch drawing"></Image>
                  <Image
                    src={nftLight}
                    alt="nft light logo"
                    className="absolute bottom-2 right-4"></Image>
                </div>
                <Image
                  src={arrow}
                  alt="arrow"
                  className="max-md:w-[30%] max-sm:rotate-90"></Image>
                <div className="bg-white rounded-[15px] relative h-44 w-36 flex justify-center items-center">
                  <Image src={polygon} alt="polygon shape"></Image>
                  <Image
                    src={watch}
                    alt="watch drawing"
                    className="absolute w-[40%]"></Image>
                  <Image
                    src={shield}
                    alt="shield logo"
                    className="absolute bottom-2 right-4"></Image>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-0">
              {' '}
              <div className="relative w-full h-full">
                <Image
                  src={shapeOne}
                  alt="new image 1"
                  className="absolute inset-0 top-[30px] w-96"
                  style={{ zIndex: -1 }}
                />{' '}
                <Image
                  src={shapeTwo}
                  alt="new image 2"
                  className="absolute inset-0 rotate-[-34deg] top-32 left-60 w-68 max-md:w-80 sm:max-md:w-28 max-sm:w-20"
                  style={{ zIndex: -2 }}
                />{' '}
              </div>
            </div>
          </div>
        </div>
        <div className="containerRight flex flex-col items-left justify-left gap-16">
          <h2 className="text-[40px] font-bold">
            Instant<br className="max-[1378px]:hidden"></br> authentication.
          </h2>
          <ul className="text-[22px] list-disc list-inside">
            <li>One NFT per item.</li>
            <li>Minted by the brand when buying.</li>
            <li>Full time accessibility.</li>
            <li>NTAG-424 secured technology.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
