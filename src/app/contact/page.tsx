import type { Metadata } from "next";
import ContactForm from "../component/contact/ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ | みんなの政治",
  description: "みんなの政治へのお問い合わせはこちらから。",
};

export default function ContactPage() {
  return (
    <main className="pt-16">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">お問い合わせ</h1>
        <ContactForm />
      </div>
    </main>
  );
}
