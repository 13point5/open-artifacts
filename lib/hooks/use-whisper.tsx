import React, { useState, useEffect } from "react";
import { useWhisper } from "@chengsokdara/use-whisper";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class WhisperErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Whisper hook error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null; // Or return a fallback UI
    }

    return this.props.children;
  }
}

export const useWhisperWithErrorBoundary = (options: any) => {
  const [errorBoundaryKey, setErrorBoundaryKey] = useState(0);
  const [hookResult, setHookResult] = useState<any>(null);

  useEffect(() => {
    setErrorBoundaryKey((prev) => prev + 1);
  }, [options.apiKey]);

  const WhisperComponent = () => {
    const result = useWhisper(options);
    useEffect(() => {
      setHookResult(result);
    }, [result]);
    return null;
  };

  return {
    ...hookResult,
    WhisperErrorBoundary: ({ children }: { children: React.ReactNode }) => (
      <WhisperErrorBoundary key={errorBoundaryKey}>
        <WhisperComponent />
        {children}
      </WhisperErrorBoundary>
    ),
  };
};
