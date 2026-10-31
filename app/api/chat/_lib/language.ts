// Words that are unambiguously Indonesian (no common English homograph, so a name like "Ada" doesn't trigger it).
const INDONESIAN_MARKERS =
  /\b(kamu|kau|anda|saya|aku|apa|apakah|bagaimana|gimana|siapa|berapa|yang|tidak|nggak|gak|dong|sih|masih|mau|bisa|untuk|dengan|dari|itu|ini|halo|makasih|terima kasih|tolong|boleh|kenapa|mengapa|kapan|dimana|pacar|jomblo|gaji|harga|tarif|kerja|proyek|lahir|umur|punya)\b/i

export function isIndonesian(text: string): boolean {
  return INDONESIAN_MARKERS.test(text)
}
