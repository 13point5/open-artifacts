import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
            Open Artifacts
          </h1>
          <nav className="flex flex-row items-center gap-4">
            <Link href="/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Create Artifacts with any LLM
            </h2>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Open Artifacts is a{" "}
              <strong className="text-gray-900">free</strong>, open-source
              project that supports generating Artifacts inspired by{" "}
              <Link
                href="https://www.anthropic.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>Anthropic</strong>
              </Link>{" "}
              using{" "}
              <Link
                href="https://www.claude.ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>Claude</strong>
              </Link>{" "}
              and{" "}
              <Link
                href="https://www.openai.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>OpenAI</strong>
              </Link>{" "}
              models with your own API keys.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link href="/new">
                  <Button size="lg" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a
                  href="https://github.com/13point5/open-artifacts"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="w-full">
                    View on GitHub
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/demo.png"
              alt="Open Artifacts Demo"
              width={1200}
              height={675}
              className="rounded-lg shadow-2xl pt-1"
            />
          </div>

          <div className="mt-20 flex flex-col items-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              📸 Crop and 🔊 Talk: Iterate Naturally
            </h3>
            <p className="max-w-lg text-center text-lg text-gray-600 mb-8">
              Our Crop and Talk feature allows you to visually select areas of
              your artifacts and say or type your changes, creating a more
              natural and context-aware iteration process.
            </p>
            <div className="relative">
              <Image
                src="/crop-and-talk.png"
                alt="Crop and Talk Feature"
                width={1200}
                height={675}
                className="rounded-lg shadow-2xl"
              />
            </div>

            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-10">
              <div className="rounded-md shadow">
                <Link href="/new">
                  <Button size="lg" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a
                  href="https://github.com/13point5/open-artifacts"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="w-full">
                    View on GitHub
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-400">
            &copy; 2024 Open Artifacts. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1 mt-4 text-center">
            <span>Built by</span>
            <a
              href="https://www.linkedin.com/in/13point5/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold transition hover:text-gray-600 flex items-center gap-1"
            >
              Sriraam
            </a>
            <span>|</span>
            <span>Open Sourced on</span>
            <a
              href="https://github.com/13point5/open-artifacts"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold transition hover:text-gray-600 flex items-center gap-1"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
