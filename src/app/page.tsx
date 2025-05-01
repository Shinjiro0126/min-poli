import { MdMenuBook } from "react-icons/md";

export default function Home() {
  return (
    <>
      <div 
        className="grid justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]"
        style={{
          backgroundImage: 'url("/img/background.svg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
        >
      <main className="flex flex-col items-center justify-center w-full">
        <div className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-4 w-full xl:w-1/2">
          <a
            href="/know"
            className="px-6 py-4 rounded-md bg-white text-primary-700 hover:text-white font-semibold text-lg hover:bg-primary-700 border border-primary-700 text-center"
          >
            <MdMenuBook className="inline text-6xl sm:text-8xl" />
            <h4 className="mt-6">政治を知る</h4>
          </a>
          <a
            href="#"
            className="px-6 py-4 rounded-md bg-white text-primary-700 hover:text-white font-semibold text-lg hover:bg-primary-700 border border-primary-700 text-center"
          >
              <span className="material-symbols-outlined inline !text-6xl sm:!text-8xl">
                nature_people
              </span>
            <h4 className="mt-6">政策広場へ行く</h4>
          </a>
        </div>
      </main>
    </div>
    </>
  );
}
