import Button from "@/app/component/Button";

export default function NotFoundPage() {
  return (
      <div className="max-w-md mx-auto text-center px-4 py-24">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-8xl font-bold text-primary-700 mb-4">404</h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
            ページが見つかりません
          </h2>
          <p className="text-gray-600">
            お探しのページは存在しないか、移動された可能性があります。
          </p>
        </div>

        <div className="space-y-4">
          <Button
            href="/"
            className="inline-flex items-center gap-2 bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-colors font-semibold"
          >
            今日のテーマを見る  
          </Button>

        </div>
      </div>
  );
}