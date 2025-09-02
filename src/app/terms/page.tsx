import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 | みんなの政治",
  description: "みんなの政治の利用規約をご確認ください。",
};

export default function TermsPage() {
  return (
    <main className="pt-16">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="h2 mb-8 text-center">利用規約</h1>

        <div className="prose max-w-none text-gray-700">
          <section className="mb-8">
            <h2 className="h4 mb-4 text-primary-700">第1条（適用）</h2>
            <p className="mb-4">
              この利用規約（以下「本規約」）は、「みんなの政治」（以下「本サービス」）の利用条件を定めるものです。
              ユーザーの皆様には、本規約に従って本サービスをご利用いただきます。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="h4 mb-4 text-primary-700">第2条（利用登録）</h2>
            <p className="mb-4">
              本サービスの利用を希望する方は、本規約に同意の上、所定の手続きにより利用登録を申請し、
              当方がこれを承認することで利用登録が完了します。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="h4 mb-4 text-primary-700">第3条（禁止事項）</h2>
            <p className="mb-4">ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません：</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>法令または公序良俗に反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>他のユーザーまたは第三者の権利を侵害する行為</li>
              <li>差別的、誹謗中傷的な内容の投稿</li>
              <li>虚偽の情報を投稿する行為</li>
              <li>本サービスの運営を妨害する行為</li>
              <li>不正アクセスやコンピューターウイルスの送信等</li>
              <li>営利目的での本サービスの利用</li>
              <li>その他、当方が不適切と判断する行為</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="h4 mb-4 text-primary-700">第4条（本サービスの提供の停止等）</h2>
            <p className="mb-4">
              当方は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく
              本サービスの全部または一部の提供を停止または中断することができます：
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
              <li>地震、落雷、火災、停電または天災などの不可抗力により本サービスの提供が困難となった場合</li>
              <li>コンピュータまたは通信回線等が事故により停止した場合</li>
              <li>その他、当方が本サービスの提供が困難と判断した場合</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="h4 mb-4 text-primary-700">第5条（利用制限および登録抹消）</h2>
            <p className="mb-4">
              当方は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、
              ユーザーに対して本サービスの全部もしくは一部の利用を制限し、
              またはユーザーとしての登録を抹消することができます：
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>本規約のいずれかの条項に違反した場合</li>
              <li>登録事項に虚偽の事実があることが判明した場合</li>
              <li>本サービスの適切な運営に支障をきたすと判断した場合</li>
              <li>その他、当方が本サービスの利用を適当でないと判断した場合</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="h4 mb-4 text-primary-700">第6条（免責事項）</h2>
            <p className="mb-4">
              当方は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、
              特定の目的への適合性、セキュリティなど）がないことを明示的にも黙示的にも保証しておりません。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="h4 mb-4 text-primary-700">第7条（サービス内容の変更等）</h2>
            <p className="mb-4">
              当方は、ユーザーへの事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、
              ユーザーはこれに同意します。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="h4 mb-4 text-primary-700">第8条（利用規約の変更）</h2>
            <p className="mb-4">
              当方は必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができます。
              なお、本規約の変更後、本サービスの利用を開始した場合には、
              当該ユーザーは変更後の規約に同意したものとみなします。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="h4 mb-4 text-primary-700">第9条（準拠法・裁判管轄）</h2>
            <p className="mb-4">
              本規約の解釈にあたっては、日本法を準拠法とします。
              本サービスに関して紛争が生じた場合には、当方の本店所在地を管轄する裁判所を専属的合意管轄とします。
            </p>
          </section>
        </div>
        <p className="text-sm text-gray-500 mb-6">最終更新日: 2024年8月27日</p>
      </div>
    </main>
  );
}
