import { getProducts } from "@/lib/products";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductSections from "@/components/ProductSection";
import Footer from "@/components/Footer";

export default async function Home() {
  const products = await getProducts();

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

  return (
    <>
      <Header
        products={products}
        categories={categories}
        todayDate={todayDate}
      />

      <main className="min-h-screen bg-[#f1f7f3] py-10 text-black">
        <Hero todayDate={todayDate} />
        <ProductSections products={products} />
      </main>
      <Footer />
    </>
  );
}