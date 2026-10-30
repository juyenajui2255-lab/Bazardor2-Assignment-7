"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpForm() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        const form = event.currentTarget;
        const formData = new FormData(form);
        const name = String(formData.get("name"));
        const email = String(formData.get("email"));
        const password = String(formData.get("password"));
        const confirmPassword = String(formData.get("confirmPassword"));

        if (password !== confirmPassword) {
            setError("দুটি পাসওয়ার্ড মিলছে না।");
            toast.error("দুটি পাসওয়ার্ড মিলছে না।");
            return;
        }

        setLoading(true);

        try {
            const { error: signUpError } = await authClient.signUp.email({
                name,
                email,
                password,
            });

            if (signUpError) {
                const message = signUpError.message ?? "সাইন আপ করা যায়নি।";
                setError(message);
                toast.error(message);
                return;
            }
            toast.success("অ্যাকাউন্ট তৈরি হয়েছে।");
            router.push("/signin?registered=1");
        } catch (error) {
            console.error("Sign-up error:", error);
            const message = "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করো।";
            setError(message);
            toast.error(message);
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
                <h1 className="text-2xl font-bold text-[#1d2921]">
                    অ্যাকাউন্ট তৈরি করুন
                </h1>
                <p className="mt-2 text-sm text-stone-600">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-[#dce7df] bg-[#fbfdfb] p-5"
            >
                <label htmlFor="name" className="mb-1 block text-sm font-medium">
                    নাম
                </label>
                <input
                    id="name"
                    name="name"
                    required
                    placeholder="যেমন: রহিম উদ্দিন"
                    className="mb-3 w-full rounded-lg border border-[#dce7df] bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600"
                />

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
                    minLength={8}
                    placeholder="কমপক্ষে ৮ অক্ষর"
                    className="mb-3 w-full rounded-lg border border-[#dce7df] bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600"
                />

                <label
                    htmlFor="confirmPassword"
                    className="mb-1 block text-sm font-medium"
                >
                    পাসওয়ার্ড নিশ্চিত করুন
                </label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    minLength={8}
                    placeholder="আবার লিখুন"
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
                    {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
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
                    অ্যাকাউন্ট আছে?{" "}
                    <Link href="/signin" className="font-semibold text-emerald-700">
                        সাইন ইন করুন
                    </Link>
                </p>
            </form>
        </section>
    );
}