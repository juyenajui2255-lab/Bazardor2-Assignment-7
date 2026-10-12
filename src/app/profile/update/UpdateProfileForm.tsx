"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-clients";

export default function UpdateProfileForm({
    initialName,
}: {
    initialName: string;
}) {
    const router = useRouter();
    const [name, setName] = useState(initialName);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newName = name.trim();
        if (!newName) {
            toast.error("নাম লিখুন।");
            return;
        }

        setLoading(true);

        try {
            const { error } = await authClient.updateUser({ name: newName });

            if (error) {
                toast.error(error.message || "তথ্য update করা যায়নি।");
                return;
            }

            toast.success("নাম update হয়েছে।");
            router.push("/profile");
            router.refresh();
        } catch {
            toast.error("তথ্য update করা যায়নি। আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-2xl border border-[#dce7df] bg-white p-6 text-[#1d2921]"
        >
            <h1 className="text-2xl font-bold">তথ্য পরিবর্তন</h1>

            <label htmlFor="name" className="mt-5 mb-2 block text-sm font-medium">
                নাম
            </label>
            <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="w-full rounded-lg border border-[#dce7df] px-3 py-2"
            />

            <button
                type="submit"
                disabled={loading}
                className="mt-5 rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white disabled:opacity-60"
            >
                {loading ? "Update হচ্ছে..." : "তথ্য update করুন"}
            </button>
        </form>
    );
}