import { SEO_PRESETS } from "@/lib/seo";
import YTClient from "./YTClient";

/* ✅ SEO metadata (SERVER SIDE ONLY) */
export const metadata = SEO_PRESETS.yt;

export default function YTPage() {
  return <YTClient />;
}
