import Link from 'next/link';
import Image from 'next/image';
import {
  logo,
  watch,
  arrow,
  polygon,
  nftLight,
  shield,
} from '../../../../public';

export default function S_stolen() {
  return (
    <div className="minh-screen px-[10%] bg-white">
      <div className="py-[8%] flex items-center justify-center gap-20 flex-wrap max-2xl:gap-14">
        <div className="containerLeft text-black flex flex-col items-left justify-left gap-16">
          <h2 className="text-[40px] max-sm:text-[28px] font-bold">
            Item stolen or lost ? <br className="invisible" />
            <span className="bg-gradient-to-l from-span-purple-light to-span-purple inline-block text-transparent bg-clip-text">
              Everyone
            </span>{' '}
            will know.
          </h2>
          <ul className="text-[22px] font-bold list-disc list-inside w-80">
            <li>Instantly change your item’s status on the blockchain.</li>
            <li>Everyone will see it after scanning your item.</li>
          </ul>
        </div>
        <div className="containerRight">
          <div className="relative">
            <div className="bg-gradient-stolen border-[1px] border-solid border-white rounded-[15px] backdrop-blur-lg flex flex-col items-center justify-center gap-10 py-[15%] px-6 relative z-10">
              {' '}
              <h2 className="text-[28px] font-bold w-[80%] text-center">
                {"It's not authentic without its digital identity"}
              </h2>
              <div className="flex items-center justify-center flex-wrap gap-10">
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
          </div>
        </div>
      </div>
    </div>
  );
}
