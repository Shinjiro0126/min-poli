import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | みんなの政治",
  description: "みんなの政治のプライバシーポリシーをご確認ください。",
};

export default function PrivacyPage() {
  return (

    <main className="pt-16">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="h2 mb-8 text-center">プライバシーポリシー</h1>

        <div className="prose max-w-none text-gray-700">
          <section className="mb-8">
            <h2 className="h4 mb-4 text-primary-700">1. 個人情報の収集について</h2>
            <p className="mb-4">
              当サービス「みんなの政治」では、以下の個人情報を収集する場合があります：
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>メールアドレス（アカウント作成時）</li>
              <li>パスワード（暗号化して保存）</li>
              <li>投票データ（匿名化して処理）</li>
              <li>サービス利用状況（アクセスログなど）</li>
              <li>Google Firebase Analyticsによる行動データ（IPアドレス、デバイス情報、ページ閲覧履歴等）</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="h4 mb-4 text-primary-700">2. 個人情報の利用目的</h2>
            <p className="mb-4">収集した個人情報は、以下の目的で利用いたします：</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>サービスの提供・運営</li>
              <li>ユーザーサポート</li>
              <li>サービスの改善・開発</li>
              <li>重要なお知らせの配信</li>
              <li>不正利用の防止</li>
              <li>ユーザー行動の分析によるサービス向上</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="h4 mb-4 text-primary-700">3. 個人情報の第三者提供</h2>
            <p className="mb-4">
              当サービスは、法令に定める場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
              ただし、以下の場合は除きます：
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>法令に基づく場合</li>
              <li>人の生命、身体または財産の保護のために必要がある場合</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="h4 mb-4 text-primary-700">4. 個人情報の安全管理</h2>
            <p className="mb-4">
              当サービスは、個人情報の漏洩、滅失、または毀損の防止その他個人情報の安全管理のために、
              適切な技術的・組織的安全管理措置を講じます。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="h4 mb-4 text-primary-700">5. 個人情報の開示・訂正・削除</h2>
            <p className="mb-4">
              ユーザーは、自身の個人情報について開示、訂正、削除を求めることができます。
              ご希望の場合は、お問い合わせページよりご連絡ください。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="h4 mb-4 text-primary-700">6. お問い合わせ</h2>
            <p className="mb-4">
              プライバシーポリシーに関するお問い合わせは、お問い合わせページよりご連絡ください。
            </p>
          </section>
        </div>
        <p className="text-sm text-gray-500 mb-6">最終更新日: 2024年8月27日</p>
      </div>
    </main>
  );
}
