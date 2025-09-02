import type { Metadata } from "next";
import { FaCircle } from 'react-icons/fa';
import { MdOutlineStickyNote2, MdRecordVoiceOver, MdGroups } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { FaHandHoldingHeart } from "react-icons/fa6";
import Image from "next/image";

export const metadata: Metadata = {
  title: "このアプリについて | みんなの政治",
  description: "政治をもっと身近に、もっと楽しく。あなたの声が社会を変える一歩になります。",
};

export default function AboutPage() {
  return (
<main className="pt-16">
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="h2 mb-8 text-center">このアプリについて</h1>
      
      <div className="prose max-w-none">
        <section className="mb-24 text-center">
          <h2 className="h4 text-primary-700 mb-4">「みんなの政治」とは</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            「みんなの政治」は、政治をもっと身近に感じられるようにするためのプラットフォームです。
            政治的な話題について、みんなで意見を共有し、お互いの考えを理解することで、
            より良い社会づくりに貢献することを目指しています。
          </p>
        </section>

        {/* ソリューションセクション */}
        <section className="mb-24">
          <div className="mb-16 text-center">
            <h2 className="h4 text-primary-700 mb-6">
              「みんなの政治」が変えること
            </h2>
            <p className="h6 text-gray-600">
              気軽で楽しい体験を通じて、あなたの政治への関わり方が変わります
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center group animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="w-20 h-20 bg-blue-500 rounded-2xl mx-auto mb-6 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <MdOutlineStickyNote2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">気軽にアンケート</h3>
              <p className="text-gray-600 leading-relaxed">
                堅苦しい政治の話も、<br />
                シンプルなアンケート形式で<br />
                気軽に参加できます
              </p>
            </div>

            <div className="text-center group animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="w-20 h-20 bg-green-500 rounded-2xl mx-auto mb-6 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <VscGraph className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">みんなの声を見える化</h3>
              <p className="text-gray-600 leading-relaxed">
                あなたと同じ考えの人が<br />
                こんなにいる！グラフで<br />
                実感できます
              </p>
            </div>

            <div className="text-center group animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <div className="w-20 h-20 bg-purple-500 rounded-2xl mx-auto mb-6 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <MdRecordVoiceOver className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">いろんな考えに出会う</h3>
              <p className="text-gray-600 leading-relaxed">
                他の人の意見を知ることで<br />
                新しい視点が生まれ、<br />
                考えが深まります
              </p>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <div className="bg-secondary-50 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            
            <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="h4 text-primary-700 mb-4 text-center">私たちの目標</h2>
                  <h3 className="h4 text-gray-800 mb-4 leading-tight text-center">
                    政治を、みんなのものに。
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    このアプリを通じて、より多くの人が政治に関心を持ち、
                    実際の行動につながることを目指しています。
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-3 bg-white bg-opacity-70 p-4 rounded-xl shadow-sm">
                    <div className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center flex-shrink-0">
                      <FaHandHoldingHeart className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">政治は難しくない、身近なもの</span>
                  </div>

                  <div className="flex items-center gap-3 bg-white bg-opacity-70 p-4 rounded-xl shadow-sm">
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
                      <MdGroups className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">みんなで一緒に、より良い社会を</span>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Image
                    src="/img/about.svg"
                    alt="みんなの政治イメージ"
                    width={400}
                    height={200}
                    className="mx-auto"
                  />
                </div>
              
            </div>
          </div>
        </section>

        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="h4 text-gray-800 mb-4">使い方</h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="space-y-8">
              {/* ステップ1 */}
              <div className="flex items-start gap-8">
                <div className="flex-shrink-0 w-8 h-8 border-2 border-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">アカウントを作成</h3>
                  <p className="text-gray-600 leading-relaxed">
                    メールアドレスまたはGoogleアカウントで登録。
                    30秒で完了します。
                  </p>
                </div>
              </div>

              {/* 区切り線 */}
              <div className="border border-gray-200"></div>

              {/* ステップ2 */}
              <div className="flex items-start gap-8">
                <div className="flex-shrink-0 w-8 h-8 border-2 border-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">アンケートに参加</h3>
                  <p className="text-gray-600 leading-relaxed">
                    気になる政治のトピックを選んで投票。
                    理由や意見も記入できます（任意）。
                  </p>
                </div>
              </div>

              {/* 区切り線 */}
              <div className="border border-gray-200"></div>

              {/* ステップ3 */}
              <div className="flex items-start gap-8">
                <div className="flex-shrink-0 w-8 h-8 border-2 border-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">結果を確認</h3>
                  <p className="text-gray-600 leading-relaxed">
                    投票結果をグラフで確認。
                    他の人の意見も読んで、新しい発見を。
                  </p>
                </div>
              </div>
            </div>

            {/* ボトムメッセージ */}
            <div className="mt-16 text-center">
              <div className="border border-gray-200 rounded-lg p-8 bg-gray-50">
                <p className="text-gray-700 font-medium mb-6">
                  これだけで政治参加ができます
                </p>
                <div className="flex justify-center gap-12 text-sm text-gray-600">
                  <span className="flex items-center gap-2">
                    <FaCircle className="text-blue-500 text-xs" />
                    無料で利用
                  </span>
                  <span className="flex items-center gap-2">
                    <FaCircle className="text-green-500 text-xs" />
                    匿名投票可能
                  </span>
                  <span className="flex items-center gap-2">
                    <FaCircle className="text-purple-500 text-xs" />
                    いつでも参加
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
</main>

  );
}
