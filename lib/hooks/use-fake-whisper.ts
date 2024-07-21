import { useWhisper as useRealWhisper } from "@chengsokdara/use-whisper";
import { useState } from "react";

type WhisperResult = ReturnType<typeof useRealWhisper>;

export const useFakeWhisper = (): WhisperResult => {
  const [recording, setRecording] = useState(false);

  return {
    recording,
    speaking: false,
    transcribing: false,
    transcript: { text: "", blob: undefined },
    pauseRecording: () => new Promise((resolve) => resolve()),
    startRecording: () =>
      new Promise<void>((resolve) => {
        setRecording(true);
        resolve();
      }),
    stopRecording: () =>
      new Promise<void>((resolve) => {
        setRecording(false);
        resolve();
      }),
  };
};
