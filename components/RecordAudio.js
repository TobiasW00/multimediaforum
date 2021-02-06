import {useEffect, useRef, useState} from 'react';
import useRecorder from '../hooks/useRecorder';
export default function RecordAudio() {
const {download,start,stop,streamRef,status} = useRecorder();
const canvasVizulizer = useRef(null);
const [showvisual,setVisual] = useState(false);

useEffect(()=>
{
  const canvasCtx = canvasVizulizer.current.getContext("2d");
  if(status != "Aufnahme")
  {
  
    canvasCtx.clearRect(0,0,canvasVizulizer.current.width , canvasVizulizer.current.height);
    return;
  }

  
let audioCtx;

function visualize(stream) {


  if(!audioCtx) {
    audioCtx = new AudioContext();
  }
  console.log(stream);
  const source = audioCtx.createMediaStreamSource(stream);

  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  source.connect(analyser);

  draw()

  function draw() {
    const WIDTH = canvasVizulizer.current.width
    const HEIGHT = canvasVizulizer.current.height;

    requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
    canvasCtx.beginPath();

    let sliceWidth = WIDTH * 1.0 / bufferLength;
    let x = 0;


    for(let i = 0; i < bufferLength; i++) {

      let v = dataArray[i] / 128.0;
      let y = v * HEIGHT/2;

      if(i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvasVizulizer.current.width, canvasVizulizer.current.height/2);
    canvasCtx.stroke();

  }
}

visualize(streamRef.current);



},[status]);

    return (
        <div>
            <div id="viz">
            <canvas ref={canvasVizulizer}></canvas>

              </div>
              <div id="controls">
<button onClick={start} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">
Aufzeichnen
</button>
<button onClick={stop} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">
Aufzeichnung beenden
</button>
<button onClick={download} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">
Aufzeichnung speichern
</button>
<button onClick={()=>setVisual(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">
Darstellen
</button>
</div>
</div>
  );
}

