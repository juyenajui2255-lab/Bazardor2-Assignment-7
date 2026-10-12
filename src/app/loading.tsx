export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f1f7f3] px-4 py-8 text-black">
      <div className="mx-auto max-w-6xl animate-pulse space-y-5">
        <div className="h-14 rounded-2xl bg-[#dce7df]" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-36 rounded-2xl bg-[#dce7df]" />
          <div className="h-36 rounded-2xl bg-[#dce7df]" />
          <div className="h-36 rounded-2xl bg-[#dce7df]" />
        </div>
      </div>
    </main>
  );
}