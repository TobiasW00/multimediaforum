
import Head from 'next/head'

export default function Post({ postData }) {
  return (
    <Layout>

      <article>
        test
</article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = []
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {

  return {
    props: {
      postData:[]
    }
  }
}
