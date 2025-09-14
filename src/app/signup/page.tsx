import React, { Suspense } from "react";
import SignupForm from "../component/signup/SignupForm";

export default function Signup() {
  return (
    <div 
      className="grid justify-items-center min-h-screen p-2 font-[family-name:var(--font-geist-sans)]"
      style={{
        backgroundImage: 'url("/img/background.svg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <main className="flex flex-col items-center justify-center w-full">
        <Suspense fallback={
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-10 w-24"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        }>
          <SignupForm />
        </Suspense>
      </main>
    </div>
  );
}
