// src/app/component/know/VideoList.tsx
import Link from "next/link";
import Image from "next/image";
import { getRelativeTimeString } from "@/util/date";
import { DVideoListItem } from "@/types/dvideo/dvideo";

interface VideoListProps {
  videos: DVideoListItem[];
}

export default function VideoList({ videos }: VideoListProps) {
  return (
    <>
      {videos.map((video) => (
        <Link
          key={video.id}
          href={`/know/${video.id}`}
          className="flex flex-col-reverse sm:flex-row justify-between gap-4 sm:gap-6 border-b border-b-stone-300 py-3 sm:px-2"
        >
          <div className="flex flex-col justify-between gap-2">
            <p className="sub-title1 line-clamp-2 h-12 sm:line-clamp-4 sm:h-18">
              {video.title}
            </p>
            <span className="text-stone-500 font-caption">
              {video.published_at && getRelativeTimeString(video.published_at)}
            </span>
          </div>
          <div className="w-full sm:min-w-40 sm:max-w-50 flex justify-end items-center">
            <div className="aspect-video w-full rounded-lg overflow-hidden relative">
              <Image
                src={video.thumbnail_url || '/img/no-image.png'}
                alt={video.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}