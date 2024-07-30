import Sidebar from "@/components/Sidebar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex w-full flex-col bg-white lg:flex-row">
      <Sidebar />

      <div className="flex-1 overflow-auto  lg:max-h-screen ">
        <div className="max-w-auto min-h-screen md:px-10 w-full text-dark-400 bg-zinc-100 ">
          {children}
        </div>
      </div>
      {/* <Toaster /> */}
    </main>
  );
}
