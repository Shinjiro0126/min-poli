import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-800 text-white pt-8 flex justify-center flex-col">
      <div className="container mx-auto px-4 mb-6">
        <div className='mb-6 flex justify-center md:justify-start'>
          <Link
            href="/"
            aria-label="みんなの政治ホーム"
          >
            <Image
              className="h-10 md:h-12 w-auto filter brightness-0 invert"
              src="/img/logo-title.svg"
              alt="みんなの政治ロゴ"
              width={120}
              height={44}
            />
          </Link>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* サイト情報リンク */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-center md:text-left">
            <Link 
              href="/about" 
              className="text-stone-300 hover:text-primary-500 transition-colors duration-200"
            >
              このアプリについて
            </Link>
            <Link 
              href="/privacy" 
              className="text-stone-300 hover:text-primary-500 transition-colors duration-200"
            >
              プライバシーポリシー
            </Link>
            <Link 
              href="/terms" 
              className="text-stone-300 hover:text-primary-500 transition-colors duration-200"
            >
              利用規約
            </Link>
            <Link 
              href="/contact" 
              className="text-stone-300 hover:text-primary-500 transition-colors duration-200"
            >
              お問い合わせ
            </Link>
          </div>
        </div>

        {/* サイトの説明 */}
        <div className="mt-6 pt-4 border-t border-stone-600">
          <p className="text-center text-stone-400 leading-relaxed">
            「みんなの政治」は、政治をもっと身近に感じられるプラットフォームです。<br className="hidden md:block" />
            アンケートを通じて、みんなの意見を共有し、政治への理解を深めることができます。
          </p>
        </div>
      </div>
      <div className="py-2">
        <div className="container mx-auto px-4">
          <p className="text-center font-caption text-stone-400 leading-relaxed">
            © {currentYear} みんなの政治. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
