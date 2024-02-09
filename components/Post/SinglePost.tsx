import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  thumbnail: string;
  isPaginationPage: boolean;
};

const SinglePost = (props: Props) => {
  const { title, description, date, tags, slug, isPaginationPage, thumbnail } =
    props;

  return (
    <>
      {isPaginationPage ? (
        <section className="py-5 flex bg-nb2 mb-8 mx-auto rounded-md pb-3 px-3 shadow-2xl hover:shadow-none hover:translate-all duration-300 border-2 border-white border-opacity-60">
        <div className="border-2 borer-white border-opacity-40 mx-2 mr-4">
          <div className="hover:blur-sm duration-500">
            <Image
              style={{
                height: "100%",
                aspectRatio: 1 / 1,
                backgroundColor: "#1a224e",
              }}
              src={thumbnail}
              width={144}
              height={144}
              alt="Article Thumbnail"
              priority
            />
          </div>
        </div>

        <div className="items-center gap-3">
          <h2 className=" text-2xl font-medium">
            <Link href={`/post/${slug}`}>{title}</Link>
          </h2>
          <p className="font-normal">{description}</p>
          <div className="text-sm font-thin py-1">{date}</div>
          {tags.map((tag) => (
            <Link key={tag} href={`/post/tag/${tag}/1`}>
              <span className="cursor-pointer px-2 mt-3 mx-1 font-medium pb-1 rounded-xl  bg-white text-nb2 inline-block">
                {tag}
              </span>
            </Link>
          ))}
        </div>
      </section>
      ) : (
        <section className="py-5 flex bg-nb2 mb-8 mx-auto rounded-md pb-3 px-3 shadow-2xl hover:shadow-none hover:translate-all duration-300 border-2 border-white border-opacity-60">
          <div className="border-2 borer-white border-opacity-40 mx-2 mr-4">
            <div className="hover:blur-sm duration-500">
              <Image
                style={{
                  height: "100%",
                  aspectRatio: 1 / 1,
                  backgroundColor: "#1a224e",
                }}
                src={thumbnail}
                width={144}
                height={144}
                alt="Article Thumbnail"
                priority
              />
            </div>
          </div>

          <div className="items-center gap-3">
            <h2 className=" text-2xl font-medium">
              <Link href={`/post/${slug}`}>{title}</Link>
            </h2>
            <p className="font-normal">{description}</p>
            <div className="text-sm font-thin py-1">{date}</div>
            {tags.map((tag) => (
              <Link key={tag} href={`/post/tag/${tag}/1`}>
                <span className="cursor-pointer px-2 mt-3 mx-1 font-medium pb-1 rounded-xl  bg-white text-nb2 inline-block">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default SinglePost;
