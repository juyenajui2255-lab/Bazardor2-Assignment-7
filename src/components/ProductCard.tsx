import Link from "next/link";
import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

const unitNames: Record<string, string> = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const changeColor = isUp
    ? "bg-red-50 text-red-600"
    : isDown
      ? "bg-green-50 text-green-700"
      : "bg-stone-100 text-black";

  const changeIcon = isUp ? "▲" : isDown ? "▼" : "—";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-[#dce7df] bg-white p-4 text-black shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f1f7f2] text-2xl"
          aria-hidden="true"
        >
          {product.image}
        </span>

        <div>
          <h3 className="text-lg font-bold">{product.nameBn}</h3>
          <p className="text-sm text-[#68736c]">
            {unitNames[product.unit] ?? product.unit}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-sm text-[#68736c]">আজকের দাম</p>
          <p className="text-xl font-bold">
            {product.today.toLocaleString("bn-BD")} টাকা
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${changeColor}`}
        >
          {changeIcon}{" "}
          {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
        </span>
      </div>
    </Link>
  );
}