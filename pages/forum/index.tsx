export default function FomumIdPage()
{
    return(<div>Index</div>);
}



export async function getStaticProps(){
    return {
        props:{
            id:"test"
        }
    }
}
export async function getStaticPaths(){
    return {
        paths:[],
        fallback:false
    }
}


