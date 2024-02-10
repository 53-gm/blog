import Pagenation from "@/components/Pagenation/Pagenation";
import SinglePost from "@/components/Post/SinglePost";
import { getNumberOfPage, getPostsByPage } from "@/lib/notionAPI";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

export const getStaticPaths: GetStaticPaths = async () => {
  const numberOfPage = await getNumberOfPage();

  let params = [];
  for(let i = 1; i <= numberOfPage; i++) {
    params.push({params: {page: i.toString()}});
  }

  return {
    paths: params,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params?.page;
  const postsByPage = await getPostsByPage(parseInt(String(currentPage), 10));
  const numberOfPage = await getNumberOfPage();

  return {
    props: {
      postsByPage,
      numberOfPage,
    },
    revalidate: 60 * 1,
  };
};

const BrogPageList = ({ postsByPage, numberOfPage }: any) => {
  return (
    <div className="container h-full w-full mx-auto font-ZenKakuGothicNew">
      <Head>
        <title>Article List</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container w-full mt-16">
        <h1 className="text-6xl font-bold text-center mb-8 mt-32">ARTICLE LIST</h1>

        <section className="sm:gird grid-cols-2 gap-3 mx-auto">
          {postsByPage.map((post: any) => (
            <article key={post.id}>
              <SinglePost
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
                thumbnail={post.thumbnail}
                isPaginationPage={true}
              />
            </article>
          ))}
        </section>

        <Pagenation numberOfPage={numberOfPage} tag={undefined}/>
      </main>
    </div>
  );
};

export default BrogPageList;
