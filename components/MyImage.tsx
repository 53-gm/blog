import Image from "next/image";

const MyImage = ({ src, alt, ...rest}: any) => {
  console.log(rest);
  return (
      <Image src={src} alt={alt} width="700" height="500" priority />
  );
};

export default MyImage;
