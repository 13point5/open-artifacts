import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import {
  ArrowUpIcon,
  Loader2Icon,
  MicIcon,
  PauseIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Textarea from "react-textarea-autosize";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Attachment, Models } from "@/app/types";
import {
  getSettings,
  SettingsSchema,
  updateSettings,
} from "@/lib/userSettings";
import { AttachmentPreviewButton } from "@/components/chat/attachment-preview-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";

export type Props = {
  input: string;
  setInput: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  recording: boolean;
  onStartRecord: () => void;
  onStopRecord: () => void;
  attachments: Attachment[];
  onRemoveAttachment: (attachment: Attachment) => void;
};

export const ChatInput = ({
  input,
  setInput,
  onSubmit,
  isLoading,
  recording,
  onStartRecord,
  onStopRecord,
  attachments,
  onRemoveAttachment,
}: Props) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { onKeyDown } = useEnterSubmit({
    onSubmit,
  });
  const [model, setModel] = useState<Models>(getSettings().model);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleModelChange = (newModel: Models) => {
    setModel(newModel);

    const currentSettings = getSettings();
    const newSettings: SettingsSchema = { ...currentSettings, model: newModel };

    updateSettings(newSettings);
  };

  return (
    <div className="sticky bottom-0 mx-auto w-full pt-6 ">
      <div className="flex flex-col gap-1 bg-[#F4F4F4] p-2.5 pl-4 rounded-md border border-b-0 rounded-b-none shadow-md">
        {attachments && (
          <div className="flex items-center gap-2 mb-2">
            {attachments.map((attachment, index) => (
              <AttachmentPreviewButton
                key={index}
                value={attachment}
                onRemove={onRemoveAttachment}
              />
            ))}
          </div>
        )}

        <div className="flex gap-2 items-start">
          <Textarea
            ref={inputRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            placeholder="Send a message."
            className="min-h-15 max-h-96 overflow-auto w-full bg-transparent border-none resize-none focus-within:outline-none"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            name="message"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={!getSettings().openaiApiKey}
                  onClick={() => {
                    recording ? onStopRecord() : onStartRecord();
                  }}
                  size="icon"
                  className="w-8 h-8 disabled:pointer-events-auto"
                >
                  {recording ? (
                    <PauseIcon className="w-4 h-4" />
                  ) : (
                    <MicIcon className="w-4 h-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {getSettings().openaiApiKey
                    ? "Click to record voice and crop artifacts for editing"
                    : "Missing OpenAI API Key in Settings"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            onClick={onSubmit}
            size="icon"
            className="w-8 h-8"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2Icon className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowUpIcon className="w-4 h-4" />
            )}
          </Button>
        </div>

        <Select value={model || undefined} onValueChange={handleModelChange}>
          <SelectTrigger className="w-fit bg-[#F4F4F4] flex items-center gap-2 border-none">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent className="w-fit ">
            <SelectItem value={Models.claude}>Claude Sonnet</SelectItem>
            <SelectItem value={Models.gpt4o}>GPT 4-o</SelectItem>
            <SelectItem value={Models.gpt4turbo}>GPT-4 Turbo</SelectItem>
            <SelectItem value={Models.gpt35turbo}>GPT-3.5 Turbo</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
