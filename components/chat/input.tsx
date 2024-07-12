import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import { ArrowUpIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Textarea from "react-textarea-autosize";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Models } from "@/app/types";

export const ChatInput = () => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { onKeyDown } = useEnterSubmit({
    onSubmit: () => {
      console.log("handleSubmit");
    },
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="sticky bottom-0 mx-auto w-full pt-6 ">
      <div className="flex flex-col gap-1 bg-[#F4F4F4] p-2.5 pl-4 rounded-md border border-b-0 rounded-b-none shadow-md">
        <div className="flex gap-2 items-center">
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

          <Button size="icon" className="w-8 h-8">
            <ArrowUpIcon className="w-4 h-4" />
          </Button>
        </div>

        <Select defaultValue={Models.claude}>
          <SelectTrigger className="w-fit bg-transparent flex items-center gap-2">
            <SelectValue placeholder="Model" />
          </SelectTrigger>
          <SelectContent className="w-fit bg-transparent">
            <SelectItem value={Models.claude}>Claude</SelectItem>
            <SelectItem value={Models.gpt4o}>GPT 4-o</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
