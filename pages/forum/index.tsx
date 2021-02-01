import Head from 'next/head'
import Link from 'next/link'

export default function Home() {


return (<div>
<Link href="/">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">My Tailwind Button</button>
    </Link>
    <button>
        test
    </button>
        </div>);
    }