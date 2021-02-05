import Layout from '../components/layout'


export default function Home({ test }) {
  return (
    <Layout home>
        {test}
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      test:"test"
    }
  }
}
