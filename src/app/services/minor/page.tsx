import type { Metadata } from "next";
import { ServiceCategoryPage } from "@/components/ServiceCategoryPage";
import { serviceCategories } from "@/lib/site";

export const metadata: Metadata = {
  title: serviceCategories.minor.name,
  description: serviceCategories.minor.intro,
};

export default function MinorServicesPage() {
  return <ServiceCategoryPage category="minor" />;
}
