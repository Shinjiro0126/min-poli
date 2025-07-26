import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { getUserById } from "@/lib/user/user";
import { redirect } from "next/navigation";
import Breadcrumb from "@/app/component/Breadcrumb";
import UserProfileClient from "./UserProfileClient";

export default async function UserProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect('/login');
  }

  const user = await getUserById(session.user.id);
  
  if (!user) {
    return (
      <main className="pt-16">
        <div className="max-w-2xl mx-auto pt-12 px-4 mb-12">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              ユーザー情報が見つかりません
            </h2>
            <p className="text-gray-600">
              ユーザー情報の取得に失敗しました。再度ログインしてください。
            </p>
          </div>
        </div>
      </main>
    );
  }

  const breadcrumbData = [
    { path: "/user", label: "プロフィール" }
  ];

  return (
    <main className="pt-16">
      <div className="max-w-2xl mx-auto pt-12 px-4 mb-12">
        <Breadcrumb segments={breadcrumbData} />
        <UserProfileClient user={user} />
      </div>
    </main>
  );
}