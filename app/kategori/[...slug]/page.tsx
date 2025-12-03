import { createSupabaseReadOnlyClient } from "@/lib/supabase/server";
import CategoryTree from "@/app/components/kategori/CategoryTree";
import ListingGrid from "@/app/components/kategori/ListingGrid";
import CategoryBreadcrumb from "@/app/components/kategori/CategoryBreadcrumb";

// ----------------------------------------------------
// ⭐ 1) CATEGORY SEO META TAGS
// ----------------------------------------------------
export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const slugs = Array.isArray(slug) ? slug : [slug];

  const supabase = await createSupabaseReadOnlyClient();

  // En son slug = mevcut kategori
  const lastSlug = slugs[slugs.length - 1];

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", lastSlug)
    .maybeSingle();

  if (!category) {
    return {
      title: "Kategori bulunamadı | Materyon",
      description: "Aradığınız kategori mevcut değil.",
    };
  }

  const title = `${category.name} | Materyon`;
  const description = `${category.name} kategorisindeki tüm ilanları görüntüleyin.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/kategori/${slugs.join("/")}`,
      type: "website",
    },
  };
}

// ----------------------------------------------------
// ⭐ 2) JSON-LD STRUCTURED DATA (Kategori)
// ----------------------------------------------------
function generateCategoryJsonLd(category: any, chain: any[], listingsArr: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",

    name: category.name,
    description: `${category.name} kategorisindeki ilanlar`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/kategori/${chain
      .map((x: any) => x.slug)
      .join("/")}`,

    // ⭐ Breadcrumb Schema
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: chain.map((c: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        name: c.name,
        item: `${process.env.NEXT_PUBLIC_SITE_URL}/kategori/${chain
          .slice(0, index + 1)
          .map((x: any) => x.slug)
          .join("/")}`,
      })),
    },

    // ⭐ ItemList Schema (kategorideki ilanlar)
    mainEntity: {
      "@type": "ItemList",
      itemListElement: listingsArr.map((l: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/ilan/${l.slug}`,
        name: l.title,
      })),
    },
  };
}

// ----------------------------------------------------
// ⭐ 3) ASIL KATEGORİ SAYFASI
// ----------------------------------------------------
export default async function CategoryDynamicPage({ params }: any) {
  const { slug } = await params;
  const slugs = Array.isArray(slug) ? slug : [slug];

  const supabase = await createSupabaseReadOnlyClient();

  // 1) Kategori zincirini çöz
  let chain: any[] = [];
  let parentId: number | null = null;

  for (const s of slugs) {
    const { data: cat } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", s)
      .maybeSingle();

    if (!cat) break;

    chain.push(cat);
    parentId = cat.id;
  }

  const current = chain[chain.length - 1];
  if (!current) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Kategori bulunamadı.
      </div>
    );
  }

  // 2) tüm kategoriler
  const { data: allCats } = await supabase.from("categories").select("*");
  const categories = allCats ?? [];

  // 3) recursive alt kategori toplama
  function collectChildren(id: number): number[] {
    const ids = [id];
    function dfs(pid: number) {
      categories
        .filter((c) => c.parent_id === pid)
        .forEach((child) => {
          ids.push(child.id);
          dfs(child.id);
        });
    }
    dfs(id);
    return ids;
  }

  const filterCategoryIds = collectChildren(current.id);

  // 4) ilanları çek
  const { data: allListings } = await supabase.from("listings").select("*");
  const listings = allListings ?? [];

  const listingsArr = listings.filter((l) =>
    filterCategoryIds.includes(l.category)
  );

  // ⭐ JSON-LD oluştur
  const jsonLd = generateCategoryJsonLd(current, chain, listingsArr);

  // 5) Alt kategori ilan sayısı
  const listingCounts: Record<number, number> = {};

  for (const cat of categories) {
    const relatedIds = collectChildren(cat.id);
    listingCounts[cat.id] = listings.filter((l) =>
      relatedIds.includes(l.category)
    ).length;
  }

  return (
    <div className="w-full flex justify-center bg-gray-900 text-gray-100 py-10">
      {/* ⭐ JSON-LD Inject */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full max-w-8xl grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 px-6">

        {/* SOL PANEL */}
        <CategoryTree
          categories={categories}
          current={current}
          chain={chain}
          listingCounts={listingCounts}
        />

        {/* SAĞ TARAF */}
        <div>
          <CategoryBreadcrumb chain={chain} />

          <h1 className="text-4xl font-bold mt-4 mb-6">{current.name}</h1>

          <p className="text-gray-400 mb-4 text-sm">
            Toplam {listingsArr.length} ilan listeleniyor
          </p>

          {/* İLANLAR */}
          <ListingGrid
            items={listingsArr.map((l) => ({
              id: l.id,
              title: l.title,
              description: l.description,
              price: l.price,
              images: l.images,
              slug: l.slug,
              city: l.city,
              district: l.district,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
