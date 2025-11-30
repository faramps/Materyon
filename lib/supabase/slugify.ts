export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD") // Türkçe karakterleri parçalar
    .replace(/[\u0300-\u036f]/g, "") // aksanları siler
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-") // harf/rakam dışını '-' yap
    .replace(/^-+|-+$/g, "") // baş/sondaki '-' ları sil
    .slice(0, 80); // çok uzunsa kırp
}
