import React from 'react';
import fs from 'fs';
import path from 'path';

const Post = ({ slug, contents }) => {
  return (
    <div>
      <div>
        Hello, the slug for this is: {slug}
      </div>
      <pre>
       {contents}
      </pre>
    </div>
  );
};

export const getStaticPaths = async () => {
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

export const getStaticProps = async ({ params: { slug } }) => {
  const contents = fs.readFileSync(path.join('posts', `${slug}.md`)).toString();

  return {
    props: {
      slug,
      contents,
    },
  };
};

export default Post;
