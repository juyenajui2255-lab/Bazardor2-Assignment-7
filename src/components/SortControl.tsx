"use client";

import { useRouter } from "next/navigation";

type SortControlProps = {
  slug: string;
  sort: string;
};

export default function SortControl({ slug, sort }: SortControlProps) {
  const router = useRouter();

  function handleChange(value: string) {
    const query = value === "default" ? "" : `?sort=${value}`;
    router.push(`/category/${slug}${query}`);
  }

  return (
    <div className="flex items-center justify-end gap-3 rounded-2xl border border-[#dce7df] bg-[#f7faf8] px-5 py-3">
      <label htmlFor="sort" className="text-sm text-stone-600">
        সাজান
      </label>

      <select
        id="sort"
        value={sort}
        onChange={(event) => handleChange(event.target.value)}
        className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-black"
      >
        <option value="default">ডিফল্ট</option>
        <option value="low-to-high">দাম: কম থেকে বেশি</option>
        <option value="high-to-low">দাম: বেশি থেকে কম</option>
      </select>
    </div>
  );
}