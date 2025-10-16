import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="items-center justify-items-center flex flex-col gap-4 min-h-screen p-8 pb-20  sm:p-20">
      <p>Go to table</p>
      <Link href="/table" className="text-blue-500 w-fit">
        Table
      </Link>
    </div>
  );
}
