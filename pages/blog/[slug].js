import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import marked from 'marked';

const Post = ({ slug, htmlString, data }) => {
  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <div>
        Hello, the slug for this is: {slug}
      </div>
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    </>
  );
};

export const getStaticPaths = () => {
  const files = fs.readdirSync('posts');
  const paths = files.map(fileName => ({
    params: {
      slug: fileName.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = ({ params: { slug } }) => {
  const rawMarkdown = fs.readFileSync(path.join('posts', `${slug}.md`)).toString();
  const parsedMarkdown = matter(rawMarkdown);
  const { content, data } = parsedMarkdown;
  const htmlString = marked(content);

  return {
    props: {
      slug,
      htmlString,
      data,
    },
  };
};

export default Post;
