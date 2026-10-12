import Image from "next/image";

export default function Hero({ todayDate }: { todayDate: string }) {
    return (
        <section className="mx-auto my-8 grid w-[92%] max-w-[1568px] items-center gap-8 rounded-[40px] overflow-hidden border border-[#dce7df] bg-[#f7faf8] p-6 sm:w-[88%] sm:p-10 md:grid-cols-2 lg:w-[82%]">
            <div>
                <p className="mb-4 inline-block rounded-full bg-[#e2f2e9] px-4 py-2 text-sm font-semibold text-[#008b45]">
                    {todayDate}
                </p>

                <h1 className="mb-5 text-3xl font-bold text-[#1d2922] sm:text-5xl">
                    আজকের বাজারের দাম এক নজরে
                </h1>

                <p className="mb-8 text-base leading-7 text-[#68736c]">
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
                    বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                </p>

                <a
                    href="#all-products"
                    className="inline-block rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white shadow-md hover:bg-emerald-800"
                >
                    সব পণ্য দেখুন
                </a>
            </div>

            <Image
                src="/bazar-hero.png"
                alt="বাজারের পণ্যের ঝুড়ি"
                width={480}
                height={360}
                priority
                className="mx-auto h-auto max-h-80 w-full object-contain md:translate-x-50"
            />
        </section>
    );
}