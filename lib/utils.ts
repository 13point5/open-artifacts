import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ArtifactMessagePartData = {
  id: string | null;
  type: string | null;
  title: string | null;
  content: string;
};

export type MessagePart =
  | {
      type: "text";
      content: string;
    }
  | {
      type: "artifact";
      generating: boolean;
      data: null | ArtifactMessagePartData;
    }
  | {
      type: "thought";
      content: string | null;
    };

export function parseMessage(message: string): MessagePart[] {
  const parts: MessagePart[] = [];
  let currentPart: MessagePart | null = null;
  let buffer = "";

  for (let i = 0; i < message.length; i++) {
    const char = message[i];

    if (char === "<") {
      if (buffer.trim()) {
        parts.push({ type: "text", content: buffer.trim() });
        buffer = "";
      }

      const tagEnd = message.indexOf(">", i);
      if (tagEnd === -1) {
        buffer += char;
        continue;
      }

      const tag = message.slice(i + 1, tagEnd);

      if (tag.startsWith("antthinking")) {
        currentPart = { type: "thought", content: null };
        i = tagEnd;
      } else if (tag.startsWith("antartifact")) {
        const data: ArtifactMessagePartData = {
          id: null,
          type: null,
          title: null,
          content: "",
        };

        // New regex to properly handle quoted attributes
        const attributeRegex = /(\w+)="([^"]*)"/g;
        let match;
        while ((match = attributeRegex.exec(tag)) !== null) {
          const [, key, value] = match;
          if (key === "identifier") data.id = value;
          else if (key === "type") data.type = value;
          else if (key === "title") data.title = value;
        }

        currentPart = { type: "artifact", generating: true, data };
        i = tagEnd;
      } else if (tag === "/antthinking" || tag === "/antartifact") {
        if (currentPart) {
          if (currentPart.type === "artifact") {
            currentPart.generating = false;
          }
          parts.push(currentPart);
          currentPart = null;
        }
        i = tagEnd;
      }
    } else if (currentPart) {
      if (currentPart.type === "thought") {
        currentPart.content = (currentPart.content || "") + char;
      } else if (currentPart.type === "artifact" && currentPart.data) {
        currentPart.data.content += char;
      }
    } else {
      buffer += char;
    }
  }

  if (buffer.trim()) {
    parts.push({ type: "text", content: buffer.trim() });
  }

  if (currentPart) {
    parts.push(currentPart);
  }

  return combineTextParts(parts);
}

function combineTextParts(parts: MessagePart[]): MessagePart[] {
  const combinedParts: MessagePart[] = [];
  let currentTextContent = "";

  for (const part of parts) {
    if (part.type === "text") {
      currentTextContent += (currentTextContent ? " " : "") + part.content;
    } else {
      if (currentTextContent) {
        combinedParts.push({ type: "text", content: currentTextContent });
        currentTextContent = "";
      }
      combinedParts.push(part);
    }
  }

  if (currentTextContent) {
    combinedParts.push({ type: "text", content: currentTextContent });
  }

  return combinedParts;
}
