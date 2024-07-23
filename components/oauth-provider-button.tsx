import { OAuthProviders } from "@/app/types";
import { Button } from "@/components/ui";
import Image from "next/image";
import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  provider: OAuthProviders;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const OAuthProviderButton = ({
  onClick,
  className = "",
  children,
  provider,
}: Props) => {
  return (
    <Button
      onClick={onClick}
      className={twMerge(
        "w-full bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 flex items-center justify-center",
        className
      )}
    >
      <Image
        src={`/${provider}.svg`}
        alt={provider}
        width={20}
        height={20}
        className="mr-2"
      />

      {children}
    </Button>
  );
};
