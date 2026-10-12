import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UpdateProfileForm from "./UpdateProfileForm";
import { auth } from "@/lib/auth";
import { getProducts } from "@/lib/products";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/signin?protected=1&callbackUrl=%2Fprofile%2Fupdate");
  }

  const products = await getProducts();
  const categories = [
    ...new Map(products.map((product) => [product.category, product] as const)).values(),
  ];
  const todayDate = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  return (
    <>
      <Header products={products} categories={categories} todayDate={todayDate} />
      <main className="min-h-[calc(100vh-280px)] bg-[#f1f7f3] px-4 py-10 text-[#1d2921] sm:py-14">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">তথ্য পরিবর্তন</h1>
            <p className="mt-1 text-sm text-stone-600">
              আপনার প্রোফাইলের নাম update করুন।
            </p>
          </div>
          <UpdateProfileForm initialName={session.user.name || ""} />
        </div>
      </main>
      <Footer />
    </>
  );
}
