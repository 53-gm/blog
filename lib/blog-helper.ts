export const getPageLink = (tag : string | undefined, page: number) => {
  return tag ? `/post/tag/${tag}/${page}` : `/post/page/${page}`;
};