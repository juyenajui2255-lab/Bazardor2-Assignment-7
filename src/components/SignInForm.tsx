"use client";

import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignInForm({
    registered = false,
    protectedRoute = false,
}: {
    registered?: boolean;
    protectedRoute?: boolean;
}) {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (protectedRoute) {
            toast.error("এই পেজটি দেখতে আগে সাইন ইন করুন।", {
                id: "protected-route-warning",
            });
        }
    }, [protectedRoute]);
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const email = String(formData.get("email"));
        const password = String(formData.get("password"));

        try {
            const { error: signInError } = await authClient.signIn.email({
                email,
                password,
            });

            if (signInError) {
                setError(signInError.message ?? "সাইন ইন করা যায়নি।");
                toast.error(signInError.message ?? "সাইন ইন করা যায়নি।");
                return;
            }
            toast.success("সাইন ইন সফল হয়েছে।");
            router.push("/");
        } catch {
            setError("সাইন ইন করা যায়নি। আবার চেষ্টা করো।");
        } finally {
            setLoading(false);
        }
    }

async function handleSocialSignIn(provider: "google" | "github") {
  setError("");

  try {
    const { error: socialError } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });

    if (socialError) {
      const message =
        socialError.message ?? `${provider} দিয়ে সাইন ইন করা যায়নি।`;
      setError(message);
      toast.error(message);
    }
  } catch {
    const message = `${provider} দিয়ে সাইন ইন করা যায়নি।`;
    setError(message);
    toast.error(message);
  }
}

    return (
        <section className="mx-auto w-full max-w-md px-4 py-8">
            <div className="mb-5 text-center">
                <h1 className="text-2xl font-bold text-[#1d2921]">সাইন ইন</h1>
                <p className="mt-2 text-sm text-stone-600">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-[#dce7df] bg-[#fbfdfb] p-5"
            >
                {registered && (
                    <p className="mb-4 text-sm text-emerald-700">
                        অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।
                    </p>
                )}

                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                    ইমেইল
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="mb-3 w-full rounded-lg border border-[#dce7df] bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600"
                />

                <label htmlFor="password" className="mb-1 block text-sm font-medium">
                    পাসওয়ার্ড
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mb-3 w-full rounded-lg border border-[#dce7df] bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600"
                />

                {error && (
                    <p role="alert" className="mb-3 text-sm text-red-600">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
                >
                    {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
                </button>

                <div className="my-4 flex items-center gap-3 text-xs text-stone-500">
                    <span className="h-px flex-1 bg-[#dce7df]" />
                    অথবা
                    <span className="h-px flex-1 bg-[#dce7df]" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={() => handleSocialSignIn("google")}
                        className="rounded-lg border border-[#dce7df] bg-white px-2 py-2 text-xs font-medium hover:bg-stone-50"
                    >
                        Google দিয়ে চালিয়ে যান
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSocialSignIn("github")}
                        className="rounded-lg border border-[#dce7df] bg-white px-2 py-2 text-xs font-medium hover:bg-stone-50"
                    >
                        GitHub দিয়ে চালিয়ে যান
                    </button>
                </div>

                <p className="mt-4 text-center text-sm text-stone-600">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link href="/signup" className="font-semibold text-emerald-700">
                        সাইন আপ করুন
                    </Link>
                </p>
            </form>
            <p className="mt-5 text-center text-sm text-stone-500">
                <Link href="/" className="hover:text-emerald-700">
                    ← হোম পেজে ফিরে যান
                </Link>
            </p>
        </section>
    );
}