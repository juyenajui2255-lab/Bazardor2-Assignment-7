import { getProducts } from "@/lib/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SignInForm from "@/components/SignInForm";

type SignInPageProps = {
  searchParams: Promise<{
    registered?: string;
    protected?: string;
  }>;
};

export default async function SignInPage({
  searchParams,
}: SignInPageProps) {
  const { registered, protected: protectedRedirect } = await searchParams;
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
        <SignInForm
          registered={registered === "1"}
          protectedRoute={protectedRedirect === "1"}
        />
      </main>

      <Footer />
    </>
  );
}