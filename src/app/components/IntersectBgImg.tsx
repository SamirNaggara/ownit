import Image from 'next/image';
import background from '../assets/img/intersect.svg';

export default function IntersectBgImg() {
  return <Image src={background} alt="background image" />;
}
