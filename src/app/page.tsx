export default function Home() {
  return (
    <div 
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      style={{
        backgroundImage: 'url("/img/background.svg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
      >
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full bg-no-repeat bg-center bg-cover">
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="#"
          className="px-6 py-3 rounded-md bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-500 text-center"
        >
          政治を知る
        </a>
        <a
          href="#"
          className="px-6 py-3 rounded-md bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-500 text-center"
        >
          政策広場へ行く
        </a>
      </div>
    </main>
  </div>
  );
}
