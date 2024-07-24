"use client";

import { useEffect, useRef } from "react";
import SelectionTool from "@/components/selection-tool";
import { Props as SelectionToolProps } from "@/components/selection-tool";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export type Props = {
  code: string;
  mode: "preview" | "code";
  recording: boolean;
  onCapture: (params: { selectionImg: string; artifactImg: string }) => void;
};

export const HTMLArtifact = ({ code, mode, recording, onCapture }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSendCaptureMessage: SelectionToolProps["onSelect"] = (
    selection
  ) => {
    if (!iframeRef.current?.contentWindow) return;

    console.log("send capture msg");

    iframeRef.current?.contentWindow?.postMessage(
      {
        type: "CAPTURE_SELECTION",
        selection,
      },
      "*"
    );
  };

  const handleMessage = (event: any) => {
    console.log("event", event);
    if (event?.data?.type === "SELECTION_DATA") {
      onCapture({
        selectionImg: event.data.data.selectionImg,
        artifactImg: event.data.data.artifactImg,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (mode === "preview") {
    return (
      <>
        <div ref={contentRef} className="w-full h-full">
          <iframe
            ref={iframeRef}
            className="w-full h-full"
            loading="lazy"
            srcDoc={modifySrcDoc(code)}
          />
        </div>

        {recording && (
          <SelectionTool
            targetRef={contentRef}
            onSelect={handleSendCaptureMessage}
          />
        )}
      </>
    );
  }

  return (
    <SyntaxHighlighter
      language="html"
      style={oneDark}
      customStyle={{
        margin: 0,
        borderRadius: 0,
        width: "100%",
        overflow: "auto",
        height: "100%",
        maxHeight: "100%",
      }}
      codeTagProps={{
        style: {
          fontSize: "0.9rem",
          fontFamily: "var(--font-inter)",
        },
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
};

const packgesToInject = `
<script src="https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>
`;

const codeToInject = `
<script>
  async function handleCaptureSelection(selection) {
    const [selectionCanvas, artifactCanvas] = await Promise.all([
      html2canvas(document.body, {
        x: selection.x,
        y: selection.y,
        width: selection.width,
        height: selection.height,
        logging: false,
        useCORS: true,
      }),
      html2canvas(document.body),
    ]);

    const selectionImg = selectionCanvas.toDataURL("image/png");
    const artifactImg = artifactCanvas.toDataURL("image/png");

    window.parent.postMessage(
      {
        type: "SELECTION_DATA",
        data: { selectionImg, artifactImg },
      },
      "*"
    );
  }

  function handleMessage(event) {
    if (event?.data?.type === "CAPTURE_SELECTION") {
      handleCaptureSelection(event.data.selection);
    }
  }

  window.addEventListener("message", handleMessage);
</script>
`;

const headOpeningTag = "<head>";
const bodyClosingTag = "</body>";

const modifySrcDoc = (srcDoc: string) => {
  // copy srcDoc into new string
  let result = srcDoc;

  // Add packages inside head tag
  const headOpeningTagIndex = result.indexOf(headOpeningTag);
  if (headOpeningTagIndex === -1) return result;

  result =
    result.slice(0, headOpeningTagIndex) +
    packgesToInject +
    result.slice(headOpeningTagIndex + headOpeningTag.length);

  // Add code inside body tag
  const bodyClosingTagIndex = result.indexOf(bodyClosingTag);
  if (bodyClosingTagIndex === -1) return result;

  result =
    result.slice(0, bodyClosingTagIndex) +
    codeToInject +
    result.slice(bodyClosingTagIndex + bodyClosingTag.length);

  return result;
};
