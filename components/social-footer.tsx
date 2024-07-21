export const SocialFooter = () => {
  return (
    <footer className="flex flex-wrap items-center gap-x-1 gap-y-2 text-sm">
      <span>Built by</span>
      <a
        href="https://www.linkedin.com/in/13point5/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold transition hover:text-black/50 flex items-center gap-1"
      >
        Sriraam
      </a>
      <span className="hidden sm:inline">|</span>
      <span>Open Sourced on</span>
      <a
        href="https://github.com/13point5/open-artifacts"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold transition hover:text-black/50 flex items-center gap-1"
      >
        GitHub
      </a>
    </footer>
  );
};
