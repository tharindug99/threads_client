import MicrophoneStream from "microphone-stream";
import { useCallback, useRef, useState } from "react";
import {
  SendJsonMessage,
  SendMessage,
  WebSocketLike,
} from "react-use-websocket/dist/lib/types";
import { v4 as uuid } from "uuid";
export default function useMic(
  sendJsonMessage: SendJsonMessage,
  sendMessage: SendMessage
) {
  const micStreamRef = useRef<MicrophoneStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const startRecording = useCallback(() => {
    console.log("start recording");
    setIsRecording(true);
    const micStream = new MicrophoneStream();
    micStreamRef.current = micStream;
    let index = 0;
    let stream_id = uuid();
    window.navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const sampleRate = audioContext.sampleRate; // This will give you the sample rate of the stream

        micStream.setStream(stream);
        // @ts-ignore
        micStream.on("data", function (rawAudioChunk: Uint8Array) {
          // Convert to base64 for transmission
          const base64String = btoa(
            rawAudioChunk.reduce(function (data, byte) {
              return data + String.fromCharCode(byte);
            }, "")
          );
          sendJsonMessage({
            message: "sendaudio",
            data: {
              audio_chunk: rawAudioChunk,
              is_last_chunk: false,
              encoding: "LINEAR16",
              sample_rate: sampleRate,
              chunk_order: index++,
              stream_id: stream_id,
            },
          });
          // sendMessage(base64String);
        });
        // @ts-ignore
        micStream.on("end", function (rawAudioChunk: Uint8Array) {
          const base64String = rawAudioChunk
            ? btoa(
                rawAudioChunk.reduce(function (data, byte) {
                  return data + String.fromCharCode(byte);
                }, "")
              )
            : "";
          console.log("end");
          console.log(sampleRate);

          sendJsonMessage({
            message: "sendaudio",
            data: {
              audio_chunk: rawAudioChunk,
              is_last_chunk: true,
              encoding: "LINEAR16",
              sample_rate: sampleRate,
              stream_id: stream_id,
            },
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sendJsonMessage]);

  const stopRecording = () => {
    micStreamRef.current?.stop();
    window.navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        stream.getTracks().forEach((track) => track.stop());
      })
      .catch((err) => {
        console.log(err);
      });
    setIsRecording(false);
  };

  return {
    startRecording,
    stopRecording,
    isRecording,
  };
}
