"use client";

import type { Product } from "@/lib/products";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type HeaderProps = {
  products: Product[];
  categories: Pick<Product, "category" | "categoryNameBn" | "categoryIcon">[];
  todayDate: string;
};

const unitNames: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export default function Header({ products, categories, todayDate }: HeaderProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error("সাইন আউট করা যায়নি।");
        return;
      }
      toast.success("সাইন আউট হয়েছে।");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    }
  }

  return (
    <header className="w-full bg-white text-black">
      <div className="mx-auto w-[92%] max-w-[1568px] sm:w-[88%] lg:w-[82%]">
        <div className="flex items-center justify-between gap-3 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-xl text-white">
              🛒
            </span>
            <span>
              <span className="block font-bold">বাজার দর</span>
              <span className="block text-xs text-stone-600">{todayDate}</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {isPending ? (
              <span className="text-sm text-stone-500">লোড হচ্ছে...</span>
            ) : session ? (
              <details className="group relative">
                <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full px-2 py-1 [&::-webkit-details-marker]:hidden">
                  {session.user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={session.user.image}
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 font-semibold text-white">
                      {session.user.name?.charAt(0) || "U"}
                    </span>
                  )}
                  <span className="max-w-28 truncate text-sm font-medium">
                    {session.user.name?.split(" ")[0] || "প্রোফাইল"}
                  </span>
                  <span className="text-xs text-stone-500">⌄</span>
                </summary>

                <div className="absolute right-0 z-50 mt-3 w-64 rounded-2xl border border-[#dce7df] bg-white p-4 shadow-xl">
                  <p className="font-semibold">{session.user.name || "ব্যবহারকারী"}</p>
                  <p className="mt-1 truncate text-sm text-stone-500">
                    {session.user.email}
                  </p>
                  <Link
                    href="/profile"
                    className="mt-4 block rounded-lg px-2 py-2 text-sm hover:bg-[#f1f7f3]"
                  >
                    👤 আমার প্রোফাইল
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="mt-1 block w-full rounded-lg px-2 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    ↩ সাইন আউট
                  </button>
                </div>
              </details>
            ) : (
              <>
                <Link href="/signin" className="px-3 py-2 text-sm">
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="relative left-1/2 w-screen -translate-x-1/2 border-t border-stone-200">
          <nav className="mx-auto flex w-[92%] max-w-[1568px] gap-5 overflow-x-auto py-3 sm:w-[88%] lg:w-[82%]">
            {categories.map((category) => (
              <Link
                key={category.category}
                href={`/category/${category.category}`}
                className="shrink-0 text-sm text-black"
              >
                {category.categoryIcon} {category.categoryNameBn}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="overflow-hidden border-y border-stone-200 py-3">
        <div className="ticker-track flex w-max">
          {[...products, ...products].map((product, index) => (
            <span
              key={`${product.id}-${index}`}
              className="mx-5 flex shrink-0 items-center gap-2 text-sm"
            >
              <span>
                {product.image} {product.nameBn}
              </span>
              <span>
                {product.today.toLocaleString("bn-BD")} টাকা/
                {unitNames[product.unit] ?? product.unit}
              </span>
              <span
                className={
                  product.change.dir === "up" ? "text-red-600" : "text-green-700"
                }
              >
                {product.change.dir === "up" ? "▲" : "▼"} {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
              </span>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
