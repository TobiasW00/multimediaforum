import RecordAudio from '../../components/RecordAudio';

export default function FomumIdPage({id})
{
    return(<div>
        <RecordAudio />
    </div>);
}



export async function getStaticProps(){
    return {
        props:{
            id:"testparameter"
        }
    }
}
export async function getStaticPaths(){
    return {
        paths:[],
        fallback:false
    }
}


