import Pagenation from "@/components/Pagenation/Pagenation";
import SinglePost from "@/components/Post/SinglePost";
import {
  getAllTags,
  getNumberOfPageByTag,
  getPostsByTagAndPage,
} from "@/lib/notionAPI";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

export const getStaticPaths: GetStaticPaths = async () => {
  const allTags = await getAllTags();
  let params: { params: { tag: any; page: string } }[] = [];

  await Promise.all(
    allTags.map((tag) => {
      return getNumberOfPageByTag(tag).then((numberOfPageByTag: number) => {
        for (let i = 1; i <= numberOfPageByTag; i++) {
          params.push({ params: { tag: tag, page: i.toString() } });
        }
      });
    })
  );

  return {
    paths: params,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params?.page;
  const currentTag = context.params?.tag;
  const posts = await getPostsByTagAndPage(
    String(currentTag),
    parseInt(String(currentPage), 10)
  );

  const numberOfPageByTag = await getNumberOfPageByTag(String(currentTag));

  return {
    props: {
      posts,
      numberOfPageByTag,
      currentTag,
    },
    revalidate: 60 * 1,
  };
};

const BrogTagPageList = ({ posts, numberOfPageByTag, currentTag }: any) => {
  return (
    <div className="container h-full w-full mx-auto">
      <Head>
        <title>{`タグ:${currentTag} - MdyCode.`}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container w-full mt-16">
        <h1 className="text-6xl font-medium text-center mb-16 mt-32">タグ:{currentTag}</h1>

        <section className="lg:grid grid-cols-2 gap-3 mx-auto">
          {posts.map((post: any) => (
            <div key={post.id}>
              <SinglePost
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
                isPaginationPage={true}
                thumbnail={post.thumbnail}
              />
            </div>
          ))}
        </section>

        <Pagenation numberOfPage={numberOfPageByTag} tag={String(currentTag)} />
      </main>
    </div>
  );
};

export default BrogTagPageList;
