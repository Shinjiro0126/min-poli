import Image from "next/image";
import { MdHandshake } from "react-icons/md";
// import Avatar from "@/app/component/Avatar";
import {getRelativeTimeString} from "@/util/date";
import { FaUserCircle } from "react-icons/fa";

type UserVoiceListProps = {
  userName: string,
  timeAgo: string,
  partyLogo: string,
  content: string,
}

export default function UserVoiceList({
  userName,
  timeAgo,
  partyLogo,
  content,
}: UserVoiceListProps) {
  return (
    <div className="py-4 px-2 border-b border-stone-300">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          {/* <Avatar
            src="/img/logo.svg"
            alt="みんなの政治ロゴ"
          /> */}
          <FaUserCircle className="text-4xl"/>
          <div>
            <div className="font-label mb-1">{userName}</div>
            <div className="text-stone-500 font-caption">{getRelativeTimeString(timeAgo)}</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="relative w-15 max-h-10 h-10">
            <Image
              src={partyLogo}
              alt="政党ロゴ"
              fill
              className="object-contain"
            />
          </div>
          を支持
        </div>
      </div>
      <div className="font-body">
        {content}
      </div>
      <div className="hidden justify-end mt-2">
        <div className="text-center text-stone-300">
          <MdHandshake className="inline text-2xl" />
          <div className="font-caption">支援する</div>
        </div>
      </div>
    </div>
  );
} 