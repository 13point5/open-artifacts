import { z } from "zod";

export const settingsLocalStorageKey = "openArtifacts:settings";

export const settingsSchema = z.object({
  claudeApiKey: z.string(),
  openaiApiKey: z.string(),
});

export type SettingsSchema = z.infer<typeof settingsSchema>;

const defaultSettings: SettingsSchema = {
  claudeApiKey: "",
  openaiApiKey: "",
};

export const getSettings = (): SettingsSchema =>
  settingsSchema.parse(
    JSON.parse(
      window.localStorage.getItem(settingsLocalStorageKey) ||
        JSON.stringify(defaultSettings)
    )
  );

export const updateSettings = (newSettings: SettingsSchema) =>
  window.localStorage.setItem(
    settingsLocalStorageKey,
    JSON.stringify(newSettings)
  );
