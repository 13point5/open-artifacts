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
import { ClipboardIcon, XIcon } from "lucide-react";

export const ArtifactPanel = () => {
  return (
    <Card className="w-full h-full border-none rounded-none flex flex-col">
      <CardHeader className="bg-slate-50 rounded-lg border rounded-b-none py-2 px-4 flex flex-row items-center gap-4 justify-between space-y-0">
        <span className="font-semibold">Card Title</span>

        <div className="flex gap-2 items-center">
          <Tabs defaultValue="preview">
            <TabsList className="bg-slate-200">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button size="icon" variant="ghost">
            <XIcon className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="border-l border-r flex-1">
        <p>Card Content</p>
      </CardContent>

      <CardFooter className="bg-slate-50 border rounded-lg rounded-t-none py-2 px-4 flex items-center flex-row-reverse gap-4">
        <Button className="h-8">Publish</Button>

        <Button size="icon" variant="outline" className="w-8 h-8">
          <ClipboardIcon className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
