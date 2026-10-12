import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

type ProductPageProps = {
    params: Promise<{ slug: string }>;
};

const unitNames: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
};

function taka(value: number) {
    return `${value.toLocaleString("bn-BD")} টাকা`;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect(
            `/signin?protected=1&callbackUrl=${encodeURIComponent(`/product/${slug}`)}`,
        );
    }
    const products = await getProducts();
    const product = products.find((item) => item.slug === slug);

    if (!product) {
        notFound();
    }

    const categories = [
        ...new Map(
            products.map((item) => [item.category, item] as const),
        ).values(),
    ];

    const markets = product.markets ?? [];
    const minPrice =
        markets.length > 0
            ? Math.min(...markets.map((market) => market.min))
            : product.today;
    const maxPrice =
        markets.length > 0
            ? Math.max(...markets.map((market) => market.max))
            : product.today;
    const averagePrice =
        markets.length > 0
            ? Math.round(
                markets.reduce(
                    (total, market) => total + (market.min + market.max) / 2,
                    0,
                ) / markets.length,
            )
            : product.today;

    const todayDate = new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
    }).format(new Date());

    const isUp = product.change.dir === "up";
    const isDown = product.change.dir === "down";
    const changeAmount = Math.round(
        (product.today * Math.abs(product.change.pct)) / 100,
    );
    return (
        <>
            <Header
                products={products}
                categories={categories}
                todayDate={todayDate}
            />

            <main className="bg-[#f1f7f3] py-7 text-[#1d2921] sm:py-9">
                <div className="mx-auto w-[92%] max-w-[1568px] sm:w-[88%] lg:w-[82%]">
                    <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-stone-500">
                        <Link href="/" className="hover:text-emerald-800">
                            হোম
                        </Link>
                        <span>›</span>
                        <Link
                            href={`/category/${product.category}`}
                            className="hover:text-emerald-800"
                        >
                            {product.categoryNameBn}
                        </Link>
                        <span>›</span>
                        <span className="text-stone-700">{product.nameBn}</span>
                    </nav>

                    <section className="mb-5 flex flex-col justify-between gap-5 rounded-2xl border border-[#dce7df] bg-[#f7faf8] p-4 sm:flex-row sm:items-center sm:p-5">
                        <div className="flex items-center gap-4">
                            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#edf4ef] text-3xl">
                                {product.image}
                            </span>

                            <div>
                                <h1 className="text-xl font-bold sm:text-2xl">
                                    {product.nameBn}
                                </h1>
                                <p className="mt-1 text-sm text-stone-500">
                                    {unitNames[product.unit] ?? product.unit} ·{" "}
                                    {product.categoryNameBn}
                                </p>
                                <p
                                    className={`mt-1 text-sm ${isUp ? "text-red-600" : isDown ? "text-green-700" : "text-stone-500"
                                        }`}
                                >
                                    {isUp
                                        ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${changeAmount.toLocaleString("bn-BD")} টাকা`
                                        : isDown
                                            ? `গতকালের তুলনায় আজ দাম কমেছে · ${changeAmount.toLocaleString("bn-BD")} টাকা`
                                            : "গতকালের তুলনায় আজ দাম অপরিবর্তিত"}
                                </p>
                            </div>
                        </div>

                        <div className="min-w-28 rounded-xl bg-[#edf4ef] px-4 py-3 text-center">
                            <p className="text-xs text-stone-500">আজকের দাম</p>
                            <p className="text-2xl font-bold">
                                {product.today.toLocaleString("bn-BD")}
                            </p>
                            <p className="text-xs text-stone-500">
                                টাকা / {unitNames[product.unit] ?? product.unit}
                            </p>
                            <p
                                className={`mt-1 text-xs font-semibold ${isUp
                                    ? "text-red-600"
                                    : isDown
                                        ? "text-green-700"
                                        : "text-stone-500"
                                    }`}
                            >
                                {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                                {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                            </p>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-[#dce7df] bg-[#f7faf8] p-4 sm:p-5">
                        <h2 className="mb-4 text-base font-bold">দামের সারসংক্ষেপ</h2>

                        <div className="grid gap-3 sm:grid-cols-3">
                            <div className="rounded-xl border border-[#e1e9e3] bg-white p-4">
                                <p className="text-sm text-stone-500">সর্বনিম্ন দাম</p>
                                <p className="mt-1 text-xl font-bold text-green-700">
                                    {taka(minPrice)}
                                </p>
                                <p className="mt-1 text-xs text-stone-500">
                                    বাজারগুলোর মধ্যে সর্বনিম্ন
                                </p>
                            </div>

                            <div className="rounded-xl border border-[#e1e9e3] bg-white p-4">
                                <p className="text-sm text-stone-500">সর্বোচ্চ দাম</p>
                                <p className="mt-1 text-xl font-bold text-red-600">
                                    {taka(maxPrice)}
                                </p>
                                <p className="mt-1 text-xs text-stone-500">
                                    বাজারগুলোর মধ্যে সর্বোচ্চ
                                </p>
                            </div>

                            <div className="rounded-xl border border-[#e1e9e3] bg-white p-4">
                                <p className="text-sm text-stone-500">গড় দাম</p>
                                <p className="mt-1 text-xl font-bold text-emerald-700">
                                    {taka(averagePrice)}
                                </p>
                                <p className="mt-1 text-xs text-stone-500">
                                    বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের গড়
                                </p>
                            </div>
                        </div>

                        <h2 className="mb-3 mt-6 text-base font-bold">
                            বাজারভিত্তিক আজকের দাম
                        </h2>

                        {markets.length === 0 ? (
                            <p className="rounded-xl bg-white p-5 text-sm text-stone-600">
                                এই পণ্যের বাজারভিত্তিক দাম পাওয়া যায়নি।
                            </p>
                        ) : (
                            <div className="overflow-x-auto rounded-xl border border-[#e1e9e3]">
                                <table className="w-full min-w-\[620px\] border-collapse bg-white text-left text-sm">
                                    <thead className="bg-[#edf4ef] text-stone-600">
                                        <tr>
                                            <th className="px-4 py-3 font-semibold">বাজার</th>
                                            <th className="px-4 py-3 font-semibold">বিভাগ</th>
                                            <th className="px-4 py-3 text-right font-semibold">
                                                সর্বনিম্ন
                                            </th>
                                            <th className="px-4 py-3 text-right font-semibold">
                                                সর্বোচ্চ
                                            </th>
                                            <th className="px-4 py-3 text-right font-semibold">
                                                গড়
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {markets.map((market, index) => {
                                            const marketAverage = Math.round(
                                                (market.min + market.max) / 2,
                                            );

                                            return (
                                                <tr
                                                    key={`${market.market}-${market.division}-${index}`}
                                                    className="border-t border-[#e5ebe6] even:bg-[#f7faf8]"
                                                >
                                                    <td className="px-4 py-3">{market.market}</td>
                                                    <td className="px-4 py-3">{market.division}</td>
                                                    <td className="px-4 py-3 text-right">
                                                        {taka(market.min)}
                                                    </td>
                                                    <td className="px-4 py-3 text-right">
                                                        {taka(market.max)}
                                                    </td>
                                                    <td className="px-4 py-3 text-right font-medium">
                                                        {taka(marketAverage)}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}