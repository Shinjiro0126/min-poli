import { getDVideoById } from "@/lib/dvideo/dvideos";
import Breadcrumb from "@/app/component/Breadcrumb";
import { notFound } from "next/navigation";
import React from 'react';
import { convertNewlinesToBr } from "@/util/text";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function VideoPage({ params }: Props) {
  const { id } = await params;
  const video = await getDVideoById(id);

  if (!video) {
    notFound();
  }

  const breadcrumbData = [
    { path: "/know", label: "政治を知る" },
    { path: `/know/${video.id}`, label: "詳細" }
  ];

  return (
    <>
      <main className="pt-16">
        <div className="max-w-2xl mx-auto pt-12 px-4 mb-12">
          <Breadcrumb segments={breadcrumbData} />
          <div className="w-full">
              {/* 動画タイトル */}
              <h2 className="font-sub-title1 mb-3">
                {video.title}
              </h2>

              {/* 動画プレーヤー */}
              <div className="aspect-video w-full rounded-lg overflow-hidden mb-6">
                <iframe
                  src={`https://www.youtube.com/embed/${video.video_id}?rel=0&modestbranding=1&showinfo=0`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              {/* 動画情報 */}
              <div className="font-sub-title2">
                {convertNewlinesToBr(video.description)}
              </div>
            </div>

        </div>
      </main>
    </>
  );
}
