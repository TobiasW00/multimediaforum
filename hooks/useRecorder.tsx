import {useEffect, useRef, useState} from 'react';

export default function useRecorder()
{
    const recordedBlobsRef = useRef<MediaRecorder>(null);
    const streamRef = useRef();
    const MediaRecorderRef = useRef();
    const [status,setStatus] = useState("");


    function handleDataAvailable(event) {
        console.log('handleDataAvailable', event);
        if (event.data && event.data.size > 0) {
          //@ts-ignore
          recordedBlobsRef.current.push(event.data);
        }
      }

      function handleSuccess(stream) {
        console.log('getUserMedia() got stream:', stream);
        streamRef.current= stream; 
      }

      function download()
{
      //@ts-ignore
  const blob = new Blob(recordedBlobsRef.current, {type: 'audio/webm'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'test.webm';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);

}


      function stop()
      {
        if(MediaRecorderRef.current !=null)
        {
          console.log("Aufzeichnung stoppen");
              //@ts-ignore
          MediaRecorderRef.current.stop();
              //@ts-ignore
          streamRef.current.getTracks().forEach( track => track.stop());
        }
        setStatus("Stop");
      }

      async function start()
      {
            console.log("start recording");
            const constraints = {
              audio: {
                echoCancellation: {exact: true}
              }
            };
            try {
              const stream = await navigator.mediaDevices.getUserMedia(constraints);
              handleSuccess(stream);
            } catch (e) {
              console.error('navigator.getUserMedia error:', e);
            }
          //@ts-ignore
            recordedBlobsRef.current = [];
            let options = {mimeType: 'audio/webm'}; // audio/webm {mimeType: 'video/webm;codecs=vp9,opus'};
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
              console.error(`${options.mimeType} is not supported`);
              options = {mimeType: 'video/webm;codecs=vp8,opus'};
              if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                console.error(`${options.mimeType} is not supported`);
                options = {mimeType: 'video/webm'};
                if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                  console.error(`${options.mimeType} is not supported`);
                  options = {mimeType: ''};
                }
              }
            }
          
            try {
              console.log(streamRef.current);
                  //@ts-ignore
              MediaRecorderRef.current = new MediaRecorder(streamRef.current, options);
            } catch (e) {
              console.error('Exception while creating MediaRecorderRef.current:', e);
              return;
            }
          
            console.log('Created MediaRecorderRef.current', MediaRecorderRef.current, 'with options', options);
                //@ts-ignore
            MediaRecorderRef.current.onstop = (event) => {
              console.log('Recorder stopped: ', event);
              console.log('Recorded Blobs: ', recordedBlobsRef.current);
            };
                //@ts-ignore
            MediaRecorderRef.current.ondataavailable = handleDataAvailable;
                //@ts-ignore
            MediaRecorderRef.current.start();
            console.log('MediaRecorderRef.current started', MediaRecorderRef.current);
            setStatus("Aufnahme");
        }
      


      const streamdata ={
        download,
          stop,
          start,
          streamRef,
          status
      }
      return streamdata;
}