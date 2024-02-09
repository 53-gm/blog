import { getPageLink } from "@/lib/blog-helper";
import Link from "next/link";

interface Props {
  numberOfPage: number;
  tag: string | undefined,
}

const Pagenation = (props: Props) => {
  const { numberOfPage, tag } = props;

  let pages: number[] = [];
  for (let i = 1; i <= numberOfPage; i++) {
    pages.push(i);
  }

  return (
    <section className="mb-8 lg:w-1/2 mx-auto rounded-md p-5 font-ZenKakuGothicNew">
      <ul className="flex items-center justify-center gap-4">
        {pages.map((page) => (
          <li key={page} className="bg-white rounded-lg w-6 h-8 relative border-1">
            <Link
              href={getPageLink(tag, page)}
              className="text-xs absolute top-2/4 left-3 -translate-x-2/4 -translate-y-2/4 text-nb hover:text-nb2"
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Pagenation;
