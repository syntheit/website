"use client";

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
    <div className="flex flex-wrap gap-[10px] justify-center">
      {tabsWithCounts.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`cursor-pointer rounded-full px-[18px] py-[8px] text-[13px] font-medium transition-all border-[1.5px] border-[#3B2314] ${
              isActive
                ? "bg-[#3B2314] text-[#F5EBD9]"
                : "bg-transparent text-[#7A5C42] hover:bg-[#3B2314] hover:text-[#F5EBD9]"
            }`}
          >
            {tab.name} ({tab.count})
          </button>
        );
      })}
    </div>
  );
}
