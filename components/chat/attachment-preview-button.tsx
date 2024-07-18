/* eslint-disable @next/next/no-img-element */
import { Attachment } from "@/app/types";
import { Dialog, DialogContent } from "@/components/ui";
import { XIcon } from "lucide-react";
import { useState } from "react";

type Props = {
  value: Attachment;
  onRemove?: (value: Attachment) => void;
};

export const AttachmentPreviewButton = ({ value, onRemove }: Props) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  if (!value.contentType?.startsWith("image")) return null;

  return (
    <div className="group relative inline-block text-sm text-token-text-primary">
      <div className="relative overflow-hidden rounded-xl border border-token-border-light bg-token-main-surface-primary h-14 w-14">
        <button
          className="h-full w-full"
          onClick={() => setIsPreviewOpen(true)}
        >
          <span
            style={{
              backgroundImage: `url(${value.url})`,
            }}
            className="flex items-center h-full w-full justify-center bg-gray-500 dark:bg-gray-700 bg-cover bg-center text-white"
          ></span>
        </button>
      </div>

      {onRemove && (
        <button
          onClick={() => onRemove(value)}
          className="bg-white absolute right-1 top-1 -translate-y-1/2 translate-x-1/2 rounded-full border border-token-border-heavy bg-token-main-surface-secondary p-0.5 text-token-text-primary transition-colors hover:opacity-100 group-hover:opacity-100 md:opacity-0"
        >
          <XIcon className="w-4 h-4" />
        </button>
      )}

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-full max-h-full w-screen h-screen z-[1000]">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={value.url}
              alt={value.name || ""}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
