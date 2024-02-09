import Link from "next/link";

const navList: string[][] = [
  ["About me", "/"],
  ["Article", "/post/page/1"],
  ["Work", "/"],
  ["Twitter", "https://twitter.com/azwamdy"],
];

const Navbar = () => {
  return (
    <header className="border-b-2 top-0 w-full bg-nb2 bg-opacity-80">
      <nav className="px-5 ">
        <div className="text-center lg:flex items-center justify-between ">
            <Link href="/" className="text-3xl font-medium mx-5">
              MdyCode.
            </Link>
            <ul className="flex items-center text-xl py-4 mx-5">
              {navList.map((nav) => (
                <li key={nav[0]}>
                  <Link
                    href={nav[1]}
                    className="block px-2 lg:px-7 py-2 hover:text-sky-700 transition-all duration-300"
                  >
                    {nav[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
      </nav>
    </header>
  );
};

export default Navbar;
