import MyImage from "@/components/MyImage";
import { getSinglePost } from "@/lib/notionAPI";
import styles from "@/styles/blogPage.module.scss";
import "katex/dist/katex.min.css";
import Head from "next/head";
import Link from "next/link";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

interface CodeProps {
  node?: any;
  inline?: any;
  className?: any;
  children?: any;
}

export const getServerSideProps = async ({ params }: any) => {
  const post = await getSinglePost(params.slug);

  return {
    props: {
      post,
    },
  };
};

const Post = ({ post }: any) => {
  return (
    <>
      <Head>
        <title>{`${post.metadata.title} - MdyCode.`}</title>
        <meta name="description" content={post.metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul className="flex h-full">
        <li className="lg:w-1/5 lg:border-r"></li>
        <li className="lg:w-3/5 lg:border-r">
          <section className="container lg:px-16 h-full mt-32">
            <div className="text-center border-b border-w2 mb-12">
              <h2 className="w-full text-5xl font-medium py-2">
                {post.metadata.title}
              </h2>
              <span className="text-w2 text-sm font-thin">
                {post.metadata.date}
              </span>
              <br />
              <div className="bg-w2 rounded-xl my-3 mx-20">
                {post.metadata.tags.map((tag: string) => (
                  <Link key={tag} href={`/post/tag/${tag}/1`}>
                    <p
                      className="text-w2 bg-nb2 rounded-xl font-medium m-1 px-2 inline-block mr-2"
                      key={tag}
                    >
                      {tag}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            <article className={styles.page}>
              <Markdown
                components={{
                  code({ children, className, node, ...rest }: CodeProps) {
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        language={match[1]}
                        style={oneDark}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    );
                  },
                  img: MyImage,
                }}
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {post.markdown}
              </Markdown>
            </article>
          </section>
        </li>
        <li className="lg:w-1/5 lg:border-r"></li>
      </ul>
    </>
  );
};

export default Post;
