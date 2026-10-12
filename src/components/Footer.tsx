export default function Footer() {
  return (
    <footer className="mt-0 w-full border-t border-[#dce7df] bg-white">
      <div className="mx-auto flex w-[92%] max-w-[1568px] flex-col gap-4 py-8 text-black sm:w-[88%] md:flex-row md:items-center md:justify-between lg:w-[82%]">
        <div>
          <p className="text-sm">বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        </div>

        <p className="max-w-md text-sm">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}