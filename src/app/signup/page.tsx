import { getProducts } from "@/lib/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SignUpForm from "@/components/SignUpForm";

export default async function SignUpPage() {
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

      <main className="min-h-[70vh] bg-[#f1f7f3] py-8 text-black">
        <SignUpForm />
      </main>

      <Footer />
    </>
  );
}