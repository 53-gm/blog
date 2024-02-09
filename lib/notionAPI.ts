import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getAllPosts = async () => {
  const posts = await notion.databases.query({
    database_id: String(process.env.NOTION_DATABASE_ID),
    page_size: 100,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  const allPosts = posts.results;

  return allPosts.map((post) => {
    return getPageMetaData(post);
  });
};

const getPageMetaData = (post: any) => {
  const getTags = (tags: any) => {
    const allTags = tags.map((tag: any) => {
      return tag.name;
    });

    return allTags;
  };

  const getThumbnail = () => {
    const thumbnailList = post.properties.Thumbnail.files[0];

    if (thumbnailList != undefined) {
      return thumbnailList.file.url;
    }

    return "/hatena.png";
  };

  //console.log(post.properties.Thumbnail.files[0]);

  return {
    id: post.id,
    title: post.properties.Page.title[0].plain_text,
    description: post.properties.Detail.rich_text[0].plain_text,
    date: post.properties.Date.date.start,
    slug: post.properties.slug.rich_text[0].plain_text,
    tags: getTags(post.properties.Tag.multi_select),
    thumbnail: getThumbnail(),
  };
};

export const getSinglePost = async (slug: any) => {
  const response = await notion.databases.query({
    database_id: String(process.env.NOTION_DATABASE_ID),
    filter: {
      property: "slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  const page = response.results[0];
  const metadata = getPageMetaData(page);

  const mdBlocks = await n2m.pageToMarkdown(page.id);

  const mdString = n2m.toMarkdownString(mdBlocks).parent;

  return {
    metadata,
    markdown: mdString,
  };
};

// Topページ用記事の取得
export const getPostsForTopPage = async (pageSize: number) => {
  const allPosts = await getAllPosts();
  const fourPosts = allPosts.slice(0, pageSize);
  return fourPosts;
};

// ページ番号に応じた記事取得
export const getPostsByPage = async (page: number) => {
  const allPosts = await getAllPosts();

  const startIndex = (page - 1) * 4;
  const endIndex = startIndex + 4;
  return allPosts.slice(startIndex, endIndex);
};

export const getNumberOfPage = async () => {
  const allPosts = await getAllPosts();
  return Math.ceil(allPosts.length / 4);
};

export const getPostsByTagAndPage = async (tagName: string, page: number) => {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: string) => tag === tagName)
  );

  const startIndex = (page - 1) * 4;
  const endIndex = startIndex + 4;

  return posts.slice(startIndex, endIndex);
};

export const getNumberOfPageByTag = async (tagName: string) => {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter((post) =>
    post.tags.find((tag: string) => tag === tagName)
  );

  return Math.ceil(posts.length / 4);
};

export const getAllTags = async () => {
  const allPosts = await getAllPosts();
  const allTagsDuplicationLists = allPosts.flatMap((post) => post.tags);
  const set = new Set(allTagsDuplicationLists);
  const allTagsList = Array.from(set);

  return allTagsList;
};
