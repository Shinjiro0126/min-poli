import Link from "next/link";
import { MdMenuBook } from "react-icons/md";
import { PiParkFill } from "react-icons/pi";
import Avatar from "./component/Avatar";
import Card from "./component/Card";
import Button from "./component/Button";
import { LuUsers } from "react-icons/lu";
import { FaHeartbeat } from "react-icons/fa";
import { MdOutlineCalendarToday } from "react-icons/md";
import { MdShare } from "react-icons/md";
import { MdLightbulb } from "react-icons/md";

export default function Home() {
  return (
    <>
      <div 
        className="min-h-screen font-[family-name:var(--font-geist-sans)]"
        >
      <main className="w-full pt-16">
        <div className="py-16 px-3 mb-12 position-relative h-[256px] relative" style={{ backgroundImage: 'url("/img/main-v.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white"></div>
            <div className="max-w-2xl mx-auto relative z-10">
              <h4 className="mb-4">今日のテーマで投票しよう！</h4>
              <p className="mb-6">政治や社会課題について、みんなで考えて意見を共有しよう！</p>
              <div className="flex gap-4 items-center">
                <div className="flex -space-x-1 overflow-hidden">
                  <img className="inline-block size-10 rounded-full ring-2 ring-white bg-stone-100 p-1" src="/img/avator/avator1.svg" alt="" />
                  <img className="inline-block size-10 rounded-full ring-2 ring-white bg-stone-100 p-1" src="/img/avator/avator1.svg" alt="" />
                  <img className="inline-block size-10 rounded-full ring-2 ring-white bg-stone-100 p-1" src="/img/avator/avator1.svg" alt="" />
                </div>
                <div className="font-body-sm">
                  <span className="font-overline">1000人</span>が参加中
                </div>
              </div>
            </div>
        </div>

        <div className="max-w-3xl mx-auto px-3">
          <Card className="mb-6 shadow-md">
            <div className="text-center mb-6">
              <div className="text-stone-500 mb-2">今日の投票テーマ</div>
              <div className="text-primary-700 font-sub-title1 mb-4">教育予算の増額についてどう思いますか？</div>
              <div>
                あなたの意見を聞かせてください! 1日1回投票できます。
              </div>
            </div>
            <div className="flex justify-center">
              <Button href="/worksheet/1" className="d-inline-block bg-primary-700 hover:bg-primary-900 text-white py-3 px-4 shadow-md">
                今すぐ投票する
              </Button>
            </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <Card className="shadow-md text-center">
                <div className="flex justify-center mb-4">
                  <LuUsers className="text-[44px] text-stone-700" />
                </div>
                <h3 className="mb-1">4,320</h3>
                <p className="text-stone-700 font-body-sm">参加者数</p>
              </Card>
              <Card className="shadow-md text-center">
                <div className="flex justify-center mb-4">
                  <FaHeartbeat className="text-[44px] text-stone-700" />
                </div>
                <h3 className="mb-1">53<span className="font-caption">%</span></h3>
                <p className="text-stone-700 font-body-sm">関心向上率</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <Card className="shadow-md">
                <div className="flex gap-4 items-center mb-2">
                  <MdOutlineCalendarToday className="text-[24px] text-stone-700" />
                  <div>
                    <div className="font-body-sm">今週の投票回数</div>
                    <h4>5<span className="font-body-sm">回</span></h4>
                  </div>
                </div>
                <p>今週は後2回だよ！頑張って</p>
              </Card>
              <Card className="shadow-md">
                <div className="flex gap-4 items-center mb-2">
                  <MdShare className="text-[24px] text-stone-700" />
                  <div>
                    <div className="font-body-sm">シェア回数</div>
                    <h4>12<span className="font-body-sm">回</span></h4>
                  </div>
                </div>
                <p>今週は後2回だよ！頑張って</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 mb-6">
              <Card className="shadow-md">
                <div className="flex gap-4 items-center mb-2">
                  <MdLightbulb className="text-[24px] text-stone-700" />
                  <div>今日の豆知識</div>
                </div>
                <p>18歳選挙法は2016年から始まったよ！</p>
              </Card>
            </div>

            <div>
                          
            </div>


        </div>


      </main>
    </div>
    </>
  );
}
