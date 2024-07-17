export const SocialFooter = () => {
  return (
    <footer className="flex items-center gap-1">
      Built by{" "}
      <a
        href="https://www.linkedin.com/in/13point5/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold transition hover:text-black/50 flex items-center gap-1 w-fit"
      >
        Sriraam
      </a>
      | Open Sourced on
      <a
        href="https://github.com/13point5/open-artifacts"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold transition hover:text-black/50 flex items-center gap-1 w-fit"
      >
        GitHub
      </a>
    </footer>
  );
};
