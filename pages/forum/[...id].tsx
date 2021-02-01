export default function FomumIdPage({id})
{
    return(<div>test{id}</div>);
}



export async function getStaticProps({params}){
    return {
        props:{
            id:params.id
        }
    }
}
export async function getStaticPaths(){
    return {
        paths:[],
        fallback:false
    }
}


