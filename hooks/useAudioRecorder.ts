"use client";

import { useState, useRef, useCallback } from "react";
import { RecorderState } from "@/types";

const MAX_DURATION_MS = 5 * 60 * 1000; // 5 minutes
const SILENCE_THRESHOLD_MS = 8000;      // 8 secondes de silence → arrêt auto

interface UseAudioRecorderReturn {
  state: RecorderState;
  duration: number;
  audioBlob: Blob | null;
  error: string | null;
  startRecording: (onDone?: (blob: Blob) => void) => Promise<void>;
  stopRecording: () => void;
  reset: () => void;
}

export function useAudioRecorder(): UseAudioRecorderReturn {
  const [state, setState] = useState<RecorderState>("idle");
  const [duration, setDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef  = useRef<MediaRecorder | null>(null);
  const chunksRef         = useRef<Blob[]>([]);
  const timerRef          = useRef<ReturnType<typeof setInterval> | null>(null);
  const maxTimerRef       = useRef<ReturnType<typeof setTimeout> | null>(null);
  const analyserRef       = useRef<AnalyserNode | null>(null);
  const animFrameRef      = useRef<number | null>(null);
  const audioCtxRef       = useRef<AudioContext | null>(null);
  const onDoneRef         = useRef<((blob: Blob) => void) | null>(null);

  const clearTimers = useCallback(() => {
    if (timerRef.current)    clearInterval(timerRef.current);
    if (maxTimerRef.current) clearTimeout(maxTimerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    analyserRef.current = null;
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  }, []);

  const stopRecording = useCallback(() => {
    clearTimers();
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
      recorder.stream.getTracks().forEach((t) => t.stop());
    }
  }, [clearTimers]);

  const startRecording = useCallback(async (onDone?: (blob: Blob) => void) => {
    setError(null);
    setAudioBlob(null);
    chunksRef.current = [];
    setDuration(0);
    onDoneRef.current = onDone ?? null;

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Ton navigateur ne supporte pas l'enregistrement audio. Utilise Chrome ou Safari.");
      return;
    }

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      const e = err as DOMException;
      if (e.name === "NotAllowedError" || e.name === "PermissionDeniedError") {
        setError("Micro refusé. Autorise le micro dans les réglages de ton navigateur.");
      } else if (e.name === "NotFoundError") {
        setError("Aucun micro détecté. Vérifie que ton appareil en a un.");
      } else {
        setError("Impossible d'accéder au micro. Réessaie.");
      }
      return;
    }

    const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
      ? "audio/webm;codecs=opus"
      : MediaRecorder.isTypeSupported("audio/webm")
      ? "audio/webm"
      : "audio/mp4";

    const recorder = new MediaRecorder(stream, { mimeType });
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mimeType });
      setAudioBlob(blob);
      setState("stopped");
      // Déclenche le callback immédiatement — pas de useEffect nécessaire
      if (onDoneRef.current) {
        onDoneRef.current(blob);
      }
    };

    recorder.start(250);
    setState("recording");

    // Timer durée
    timerRef.current = setInterval(() => {
      setDuration((d) => d + 1);
    }, 1000);

    // Arrêt auto après 5 min
    maxTimerRef.current = setTimeout(stopRecording, MAX_DURATION_MS);

    // Détection silence
    const audioCtx = new AudioContext();
    audioCtxRef.current = audioCtx;
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512;
    source.connect(analyser);
    analyserRef.current = analyser;

    const data = new Uint8Array(analyser.frequencyBinCount);
    let silenceStart: number | null = null;

    const checkSilence = () => {
      if (!analyserRef.current) return;
      analyserRef.current.getByteFrequencyData(data);
      const avg = data.reduce((a, b) => a + b, 0) / data.length;

      if (avg < 3) {
        if (!silenceStart) silenceStart = Date.now();
        else if (Date.now() - silenceStart > SILENCE_THRESHOLD_MS) {
          stopRecording();
          return;
        }
      } else {
        silenceStart = null;
      }
      animFrameRef.current = requestAnimationFrame(checkSilence);
    };
    animFrameRef.current = requestAnimationFrame(checkSilence);
  }, [stopRecording]);

  const reset = useCallback(() => {
    clearTimers();
    setState("idle");
    setDuration(0);
    setAudioBlob(null);
    setError(null);
    onDoneRef.current = null;
  }, [clearTimers]);

  return { state, duration, audioBlob, error, startRecording, stopRecording, reset };
}
