export default function Post({ postData }) {
    return (
  <div>test</div>
    )
  }
  
  export async function getStaticPaths() {
  
    return {
      paths:[],
      fallback: false
    }
  }
  
  export async function getStaticProps(context) {
      return {
        props: {}
      }
    }