import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileDetails from "@/app/profile/ProfileDetails";
import { auth } from "@/lib/auth";
import { getProducts } from "@/lib/products";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/signin?protected=1&callbackUrl=%2Fprofile");
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
            <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
            <p className="mt-1 text-sm text-stone-600">
              আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন ও পরিবর্তন করুন।
            </p>
          </div>

          <ProfileDetails
            name={session.user.name || "ব্যবহারকারী"}
            email={session.user.email}
            image={session.user.image || null}
          />

          <section className="mt-4 rounded-2xl border border-[#dce7df] bg-[#fbfdfb] p-5 sm:p-6">
            <h2 className="font-bold">তথ্য</h2>
            <label className="mt-5 block text-sm font-medium" htmlFor="profile-name">
              নাম
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                id="profile-name"
                readOnly
                value={session.user.name || ""}
                className="min-w-0 flex-1 rounded-lg border border-[#dce7df] bg-white px-3 py-2 text-sm"
              />
              <Link
                href="/profile/update"
                className="rounded-lg bg-emerald-700 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-emerald-800"
              >
                তথ্য update করুন
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
