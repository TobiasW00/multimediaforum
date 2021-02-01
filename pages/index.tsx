import Head from 'next/head'
import Link from 'next/link'


export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      <body>
    <div className="h-64">
        <div className="p-4 m-4 bg-green-600">
            <h1 className="text-2xl font-bold text-white">Tailwind CSS Demo</h1>
        </div>
        <div className="p-4 m-4 bg-green-300 h-full">
            <h2 className="text-green-900">Have much fun using Tailwind CSS</h2>
        </div>  
    </div>
    <Link href="/test/123">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">My Tailwind Button</button>
    </Link>
</body>
      </main>

      <footer>
 
      </footer>

    </div>
  )
}
