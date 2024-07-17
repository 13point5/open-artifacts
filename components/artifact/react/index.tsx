"use client";

import React from "react";
import { LiveEditor, LivePreview, LiveProvider } from "react-live";

import { ArtifactViewer } from "./viewer";
import { reactLiveScope } from "@/components/artifact/react/scopes";

type Props = {
  code: string;
  mode: "preview" | "code";
};

export const ReactArtifact = ({ code, mode }: Props) => {
  return (
    <LiveProvider code={code} scope={reactLiveScope} noInline={true}>
      {mode === "preview" && (
        <LivePreview Component={() => <ArtifactViewer code={code} />} />
      )}
      {mode === "code" && (
        <LiveEditor
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            minHeight: "300px",
            height: "100%",
            maxHeight: "100%",
            width: "100%",
            overflow: "auto",
          }}
        />
      )}
    </LiveProvider>
  );
};
