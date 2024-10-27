export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <h1 className="mb-2">
              Syllabally
          </h1>
          <h2>EECS3311 Fall 2024</h2>
          <h2>Thomas Aziz, Hien Le, Maya Shamir, Marko Stojsic</h2>
          <h2>York University</h2>
        </ol>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/register"
          target="_self"
          rel="noopener noreferrer"
        >
          Create an Account
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/login"
          target="_self"
          rel="noopener noreferrer"
        >
          Login
        </a>
      </footer>
    </div>
  );
}
