"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfileDetails({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image: string | null;
}) {
  const router = useRouter();

  async function handleSignOut() {
    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error("সাইন আউট করা যায়নি।");
        return;
      }
      toast.success("সাইন আউট হয়েছে।");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    }
  }

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-[#dce7df] bg-[#fbfdfb] p-4 sm:flex-row sm:items-center sm:p-5">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="h-16 w-16 rounded-2xl object-cover" />
      ) : (
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-2xl font-bold text-emerald-800">
          {name.charAt(0) || "U"}
        </span>
      )}

      <div className="min-w-0 flex-1">
        <p className="font-semibold">{name}</p>
        <p className="mt-1 truncate text-sm text-stone-500">{email}</p>
      </div>

      <button
        type="button"
        onClick={handleSignOut}
        className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
      >
        ↩ সাইন আউট
      </button>
    </section>
  );
}
