import Link from "next/link";
import { getProducts } from "@/lib/products";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import SortControl from "@/components/SortControl";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { sort = "default" } = await searchParams;

  const products = await getProducts();
  const categoryProducts = products.filter(
    (product) => product.category === slug,
  );

  const categories = [
    ...new Map(
      products.map((product) => [product.category, product] as const),
    ).values(),
  ];

  const todayDate = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  const sortedProducts = [...categoryProducts];

  if (sort === "low-to-high") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sort === "high-to-low") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <>
      <Header
        products={products}
        categories={categories}
        todayDate={todayDate}
      />

      <main className="min-h-[calc(100vh-300px)] bg-[#f1f7f3] py-8 text-black sm:min-h-[calc(100vh-240px)]">
        <div className="mx-auto w-[92%] max-w-[1568px] sm:w-[88%] lg:w-[82%]">
          {categoryProducts.length === 0 ? (
            <div className="rounded-2xl border border-[#dce7df] bg-white p-8 text-center">
              <h1 className="mb-3 text-2xl font-bold">
                এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
              </h1>

              <Link
                href="/"
                className="inline-block rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white"
              >
                হোম পেজে ফিরে যান
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-5 flex items-center gap-4 rounded-2xl border border-[#dce7df] bg-[#f7faf8] p-4 sm:p-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#edf4ef] text-3xl">
                  {categoryProducts[0].categoryIcon}
                </span>

                <div>
                  <h1 className="text-2xl font-bold text-[#1d2921]">
                    {categoryProducts[0].categoryNameBn}
                  </h1>

                  <p className="mt-1 text-sm text-stone-500">
                    {categoryProducts.length.toLocaleString("bn-BD")}টি পণ্যের
                    আজকের দাম ও পরিবর্তন
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <SortControl slug={slug} sort={sort} />
              </div>

              <p className="mb-3 text-sm text-stone-500">
                মোট {categoryProducts.length.toLocaleString("bn-BD")}টি পণ্য
                দেখানো হচ্ছে
              </p>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}