import SinglePost from "@/components/Post/SinglePost";
import Tag from "@/components/Tag/Tag";
import { getAllTags, getPostsForTopPage } from "@/lib/notionAPI";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
export const getStaticProps: GetStaticProps = async () => {
  const fourPosts = await getPostsForTopPage(10);
  const allTags = await getAllTags();

  return {
    props: {
      fourPosts,
      allTags,
    },
    revalidate: 60,
  };
};

export default function Home({ fourPosts, allTags }: any) {
  return (
    <>
      <Head>
        <title>MdyCode</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ul className="lg:flex">
          <li className="lg:w-1/5 lg:border-r">
            <h2 className="text-center text-5xl mb-9 font-bold mt-32">TAG</h2>
            <Tag tags={allTags} />
          </li>

          <li className="lg:w-3/5 lg:border-r">
            <div className="mt-32">
              <h2 className="text-center text-5xl mb-9 font-bold">
                NEW-ARTICLE
              </h2>

              <section className="xl:grid grid-cols-2 mx-auto">
                {fourPosts.map((post: any) => (
                  <div className="mx-4" key={post.id}>
                    <SinglePost
                      title={post.title}
                      description={post.description}
                      date={post.date}
                      tags={post.tags}
                      slug={post.slug}
                      isPaginationPage={false}
                      thumbnail={post.thumbnail}
                    />
                  </div>
                ))}
              </section>
              <Link
                href="/post/page/1"
                className="mb-6 mx-auto rounded-md px-5 block text-right"
              >
                もっとみる
              </Link>
            </div>
          </li>

          <li className="lg:w-1/5">
          </li>
        </ul>
      </main>
    </>
  );
}
