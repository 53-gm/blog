import Link from "next/link";


const Footer = () => {
  return (
    <footer className="border-t h-full">
      <div className="text-center mt-10">
        <Link href={"/"} className="text-3xl font-medium mx-5">MdyCode.</Link>
      </div>
    </footer>
  );
};

export default Footer;