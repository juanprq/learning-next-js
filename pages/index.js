import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <Link href="/faq">
        <a>go to faq</a>
      </Link>
    </div>
  )
}
