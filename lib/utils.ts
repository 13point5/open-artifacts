import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ArtifactMessagePartData = {
  generating: boolean;
  id: string | null;
  type: string | null;
  title: string | null;
  content: string;
  language: string | null;
};

export type MessagePart =
  | {
      type: "text";
      data: string;
    }
  | {
      type: "artifact";
      data: ArtifactMessagePartData;
    }
  | {
      type: "thought";
      data: string | null;
    };

export function parseMessage(message: string): MessagePart[] {
  const parts: MessagePart[] = [];
  let currentPart: MessagePart | null = null;
  let buffer = "";
  let i = 0;

  while (i < message.length) {
    const char = message[i];

    if (char === "<" && !currentPart) {
      if (buffer.trim()) {
        parts.push({ type: "text", data: buffer.trim() });
        buffer = "";
      }

      const tagEnd = message.indexOf(">", i);
      if (tagEnd === -1) {
        buffer += char;
        i++;
        continue;
      }

      const tag = message.slice(i + 1, tagEnd);
      if (tag.startsWith("thinking")) {
        currentPart = { type: "thought", data: "" };
        i = tagEnd + 1;
      } else if (tag.startsWith("artifact")) {
        const data: ArtifactMessagePartData = {
          generating: true,
          id: null,
          type: null,
          title: null,
          content: "",
          language: null,
        };
        const attributeRegex = /(\w+)="([^"]*)"/g;
        let match;
        while ((match = attributeRegex.exec(tag)) !== null) {
          const [, key, value] = match;
          if (key === "identifier") data.id = value;
          else if (key === "type") data.type = value;
          else if (key === "title") data.title = value;
          else if (key === "language") data.language = value;
        }
        currentPart = { type: "artifact", data };
        i = tagEnd + 1;
      } else {
        buffer += char;
        i++;
      }
    } else if (currentPart) {
      const closingTag =
        currentPart.type === "thought" ? "</thinking>" : "</artifact>";
      const closingIndex = message.indexOf(closingTag, i);

      if (closingIndex !== -1) {
        const content = message.slice(i, closingIndex);
        if (currentPart.type === "thought") {
          currentPart.data = content;
        } else if (currentPart.type === "artifact" && currentPart.data) {
          currentPart.data.content = content;
          currentPart.data.generating = false;
        }
        parts.push(currentPart);
        currentPart = null;
        i = closingIndex + closingTag.length;
      } else {
        // If no closing tag is found, treat the rest of the message as content
        const remainingContent = message.slice(i);
        if (currentPart.type === "thought") {
          currentPart.data = remainingContent;
        } else if (currentPart.type === "artifact" && currentPart.data) {
          currentPart.data.content = remainingContent;
        }
        parts.push(currentPart);
        break;
      }
    } else {
      buffer += char;
      i++;
    }
  }

  if (buffer.trim()) {
    parts.push({ type: "text", data: buffer.trim() });
  }

  return combineTextParts(parts);
}

function combineTextParts(parts: MessagePart[]): MessagePart[] {
  const combinedParts: MessagePart[] = [];
  let currentTextContent = "";

  for (const part of parts) {
    if (part.type === "text") {
      currentTextContent += (currentTextContent ? " " : "") + part.data;
    } else {
      if (currentTextContent) {
        combinedParts.push({ type: "text", data: currentTextContent });
        currentTextContent = "";
      }
      combinedParts.push(part);
    }
  }

  if (currentTextContent) {
    combinedParts.push({ type: "text", data: currentTextContent });
  }

  return combinedParts;
}
