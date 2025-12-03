import Link from "next/link";

interface Cat {
  id: number;
  name: string;
  slug: string;
}

export default function CategoryBreadcrumb({ chain }: { chain: Cat[] }) {
  return (
    <nav className="text-sm text-gray-400 mb-4 flex items-center gap-2">
      
      {/* Anasayfa */}
      <Link href="/" className="hover:text-white transition">
        Anasayfa
      </Link>

      {/* Separator */}
      {chain.length > 0 && <span>/</span>}

      {/* Dynamic Breadcrumb */}
      {chain.map((c, i) => {
        const href = "/kategori/" + chain.slice(0, i + 1).map(x => x.slug).join("/");

        return (
          <span key={c.id} className="flex items-center gap-2">
            <Link href={href} className="hover:text-white transition">
              {c.name}
            </Link>

            {/* Son eleman değilse / koy */}
            {i < chain.length - 1 && <span>/</span>}
          </span>
        );
      })}

    </nav>
  );
}
