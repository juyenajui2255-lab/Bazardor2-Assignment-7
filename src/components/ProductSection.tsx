import type { Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

type ProductSectionsProps = {
  products: Product[];
};

export default function ProductSections({
  products,
}: ProductSectionsProps) {
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="mx-auto my-12 w-[92%] max-w-[1568px] sm:w-[88%] lg:w-[82%]">
      <section className="mb-14">
        <h2 className="mb-5 text-2xl font-bold text-black">
          <span className="text-red-700">▲</span> আজ দাম বেড়েছে
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {risers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-5 text-2xl font-bold text-black">
          <span className="text-green-700">▼</span> আজ দাম কমেছে
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {fallers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="all-products">
        <h2 className="mb-2 text-2xl font-bold text-black">সব পণ্য</h2>

        <p className="mb-5 text-black">
          মোট ৩৩টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}