import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f1f7f3] px-4 text-center text-[#1d2921]">
      <div className="rounded-3xl border border-[#dce7df] bg-[#f7faf8] p-8 sm:p-12">
        <p className="text-6xl font-bold text-emerald-700">৪০৪</p>

        <h1 className="mt-4 text-2xl font-bold">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-2 text-stone-600">
          ঠিকানাটি ভুল হতে পারে, অথবা পেজটি আর নেই।
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}