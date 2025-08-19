"use client";

import { Button } from "@/components/ui/button";

interface Tab {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
}

interface ResourceTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabsWithCounts: Tab[];
}

export function ResourceTabs({ activeTab, onTabChange, tabsWithCounts }: ResourceTabsProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 justify-center">
        {tabsWithCounts.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              variant={activeTab === tab.id ? "default" : "secondary"}
              size="lg"
              className={`flex items-center gap-2 px-6 py-6 rounded-2xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "shadow-lg"
                  : ""
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.name} ({tab.count})
            </Button>
          );
        })}
      </div>
    </div>
  );
}
