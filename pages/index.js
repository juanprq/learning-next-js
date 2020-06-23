import Link from 'next/link';
import fs from 'fs';

export default function Home({ posts }) {
  return (
    <div className="container">
      <ul>
      </ul>
      {
        posts.map(post => (
        <li key={post}>
          <Link href={`blog/${post}`}>
            <a>go to {post}</a>
          </Link>
        </li>
        ))
      }
    </div>
  );
};

export const getStaticProps = () => {
  const files = fs.readdirSync('posts');

  return {
    props: {
      posts: files.map(filename => filename.replace('.md', '')),
    },
  };
};
