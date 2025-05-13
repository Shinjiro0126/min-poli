// src/util/text.ts
import React from 'react';

/**
 * テキスト内の改行を<br>タグに変換し、URLをリンクに変換する関数
 * @param text - 処理対象のテキスト
 * @returns 改行とURLが処理されたReact要素
 */
export const convertNewlinesToBr = (text: string | null): React.ReactNode => {
  if (!text) return null;

  // URLを検出する正規表現
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // テキストを行に分割し、各行を処理
  return text.split('\n').map((line, lineIndex) => {
    // 行内のURLを検出
    const parts = line.split(urlRegex);
    
    // URLを含む場合は、テキストとリンクを交互に配置
    if (parts.length > 1) {
      return (
        <React.Fragment key={lineIndex}>
          {parts.map((part, partIndex) => {
            // URLの場合はリンクとして表示
            if (part.match(urlRegex)) {
              return (
                <a
                  key={partIndex}
                  href={part}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-info hover:underline"
                >
                  {part}
                </a>
              );
            }
            // 通常のテキストはそのまま表示
            return part;
          })}
          <br />
        </React.Fragment>
      );
    }

    // URLを含まない行はそのまま表示
    return (
      <React.Fragment key={lineIndex}>
        {line}
        <br />
      </React.Fragment>
    );
  });
};