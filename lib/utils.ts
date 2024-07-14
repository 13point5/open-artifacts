import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getEmailInitials = (email: string) => {
  // Extract the part before the '@' symbol
  const namePart = email.split("@")[0];

  // Split the name part by common separators
  const nameParts = namePart.split(/[._]/);

  // Extract the first letter of each part
  const initials = nameParts.map((part) => part.charAt(0).toUpperCase());

  // Join the initials and take the first two
  return initials.slice(0, 2).join("");
};
