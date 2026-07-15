"use client";

import ResourceManager from "@/components/dashboard/ResourceManager";
import { RESOURCE_CONFIG } from "@/components/dashboard/fieldConfigs";

export default function SkillsDashboardPage() {
  return <ResourceManager config={RESOURCE_CONFIG.skills} />;
}
