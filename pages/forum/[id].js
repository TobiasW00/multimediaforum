import Layout from '../../components/layout'

import Head from 'next/head'


export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData}</title>
      </Head>
    <div>
      Test
    </div>
    </Layout>
  )
}

export async function getStaticPaths() {
const paths = [
    { params: { id: '1' } },
    { params: { id: '2' } }
];
  console.log(paths);
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = "1"
  return {
    props: {
      postData
    }
  }
}
