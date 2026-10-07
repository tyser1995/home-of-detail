import type { Metadata } from "next";
import { ServiceCategoryPage } from "@/components/ServiceCategoryPage";
import { serviceCategories } from "@/lib/site";

export const metadata: Metadata = {
  title: serviceCategories.major.name,
  description: serviceCategories.major.intro,
};

export default function MajorServicesPage() {
  return <ServiceCategoryPage category="major" />;
}
