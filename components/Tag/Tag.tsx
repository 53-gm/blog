import Link from "next/link";

type Props = {
  tags: string[];
};

const Tag = (props: Props) => {
  const { tags } = props;
  return (
    <div className="mx-4">
      <section className="mb-8 mx-auto bg-white rounded-md p-5">
        <div className="font-medium mb-4 text-nb2 text-center">タグ検索</div>
        <div className="flex flex-wrap gap-3 items-center">
          {tags.map((tag) => (
            <Link key={tag} href={`/post/tag/${tag}/1`}>
              <span className="cursor-pointer px-2 font-medium pb-1 rounded-xl  bg-nb2 text-white inline-block">
                {tag}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tag;
