"use client";

import { ReactArtifact } from "@/components/artifact/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArtifactMessagePartData } from "@/lib/utils";
import { ClipboardIcon, XIcon } from "lucide-react";
import { useState } from "react";

type Props = {
  onClose: () => void;
} & ArtifactMessagePartData;

export type ArtifactMode = "code" | "preview";

export const ArtifactPanel = ({ title, content, onClose }: Props) => {
  const [mode, setMode] = useState<ArtifactMode>("code");

  return (
    <Card className="w-full border-none rounded-none flex flex-col h-full max-h-full">
      <CardHeader className="bg-slate-50 rounded-lg border rounded-b-none py-2 px-4 flex flex-row items-center gap-4 justify-between space-y-0">
        <span className="font-semibold">{title || "Generating..."}</span>

        <div className="flex gap-2 items-center">
          <Tabs
            value={mode}
            onValueChange={(value) => setMode(value as ArtifactMode)}
          >
            <TabsList className="bg-slate-200">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button onClick={onClose} size="icon" variant="ghost">
            <XIcon className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="border-l border-r p-0 w-full flex-1 max-h-full">
        <ReactArtifact code={content} mode={mode} />
      </CardContent>

      <CardFooter className="bg-slate-50 border rounded-lg rounded-t-none py-2 px-4 flex items-center flex-row-reverse gap-4">
        {/* <Button className="h-8">Publish</Button> */}

        <Button size="icon" variant="outline" className="w-8 h-8">
          <ClipboardIcon className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
