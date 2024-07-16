import * as React from "react";
import * as lucideIcons from "lucide-react";
import * as recharts from "recharts";
import * as datefns from "date-fns";
import * as shadcnComponents from "@/components/ui";
import * as tanstackTable from "@tanstack/react-table";
import * as zod from "zod";
import * as reactHookFormZodResolver from "@hookform/resolvers/zod";
import * as reactHookForm from "react-hook-form";

export const packageAndScopeMap: Record<string, string> = {
  react: "React",
  "lucide-react": "lucideIcons",
  "date-fns": "datefns",
  "@tanstack/react-table": "tanstackTable",
  "react-hook-form": "reactHookForm",
  "@hookform/resolvers/zod": "reactHookFormZodResolver",
};

export const reactLiveScope = {
  shadcnComponents,
  lucideIcons,
  recharts,
  datefns,
  tanstackTable,
  zod,
  reactHookForm,
  reactHookFormZodResolver,
};

export const reactArtifactScope = {
  React,
  ...reactLiveScope,
};
