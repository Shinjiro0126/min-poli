// src/util/avator_img.tsx

/**
 * アバター画像のパスをランダムに取得する関数
 * @returns ランダムなアバター画像のパス
 */
export function getRandomAvatarPath(): string {
  // public/img/avator内の画像ファイル名のリスト
  const avatarImages = [
    'avator1.png',
    'avator2.png',
    'avator3.png',
    'avator4.png'
  ];

  // ランダムなインデックスを生成
  const randomIndex = Math.floor(Math.random() * avatarImages.length);
  
  // パスを返す
  return `/img/avator/${avatarImages[randomIndex]}`;
}

/**
 * 複数のユニークなアバター画像パスを取得する関数
 * @param count 取得したいアバター画像の数
 * @returns ユニークなアバター画像パスの配列
 */
export function getRandomAvatarPaths(count: number): string[] {
  const avatarImages = [
    'avator1.png',
    'avator2.png',
    'avator3.png',
    'avator4.png',
  ];

  // 配列をシャッフル
  const shuffled = [...avatarImages].sort(() => Math.random() - 0.5);
  
  // 指定された数だけ取得してパスを付けて返す
  return shuffled.slice(0, Math.min(count, avatarImages.length))
    .map(image => `/img/avator/${image}`);
}
