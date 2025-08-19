import { useState, useEffect } from "react";
import { tabs, resources } from "@/app/metadata/resources";
import type { Resource } from "@/components/ui/resource-card";

export function useResources() {
  const [activeTab, setActiveTab] = useState("all");
  const [shuffledResources, setShuffledResources] = useState<Resource[]>([]);
  const [displayedCount, setDisplayedCount] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");

  // Get all resources from all categories
  const getAllResources = (): Resource[] => {
    const allResources: Resource[] = [];
    Object.entries(resources).forEach(([categoryId, categoryResources]) => {
      const categoryName = tabs.find(tab => tab.id === categoryId)?.name ?? categoryId;
      categoryResources.forEach((resource: Resource) => {
        allResources.push({
          ...resource,
          category: resource.category ?? categoryName,
          featured: resource.featured ?? false
        });
      });
    });
    return allResources;
  };

  // Calculate dynamic counts for each tab
  const tabsWithCounts = tabs.map(tab => ({
    ...tab,
    count: tab.id === "all" ? getAllResources().length : resources[tab.id as keyof typeof resources]?.length ?? 0
  }));

  // Search functionality
  const searchResources = (query: string, categoryResources: Resource[]): Resource[] => {
    if (!query.trim()) return categoryResources;
    
    const searchTerm = query.toLowerCase();
    
    return categoryResources.filter(resource => 
      resource.title.toLowerCase().includes(searchTerm) ||
      resource.description.toLowerCase().includes(searchTerm) ||
      (resource.category?.toLowerCase().includes(searchTerm) ?? false) ||
      resource.url.toLowerCase().includes(searchTerm)
    );
  };

  const searchResults = searchResources(searchQuery, shuffledResources);

  // Initialize active tab from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove the # symbol
    if (hash && tabs.some(tab => tab.id === hash)) {
      setActiveTab(hash);
    }
  }, []);

  // Update URL hash when active tab changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.hash = activeTab;
    }
  }, [activeTab]);

  // Shuffle resources on client side only
  useEffect(() => {
    let categoryResources: Resource[] = [];
    
    if (activeTab === "all") {
      // Get all resources from all categories
      categoryResources = getAllResources();
    } else {
      // Get resources from specific category and ensure they have required properties
      const rawResources = resources[activeTab as keyof typeof resources] || [];
      const categoryName = tabs.find(tab => tab.id === activeTab)?.name ?? activeTab;
      categoryResources = rawResources.map((resource: Resource) => ({
        ...resource,
        category: resource.category ?? categoryName,
        featured: resource.featured ?? false
      }));
    }
    
    const featured = categoryResources.filter(resource => resource.featured);
    const nonFeatured = categoryResources.filter(resource => !resource.featured);
    
    // Shuffle non-featured resources
    const shuffledNonFeatured = [...nonFeatured].sort(() => Math.random() - 0.5);
    
    setShuffledResources([...featured, ...shuffledNonFeatured]);
    setDisplayedCount(12); // Reset displayed count when changing tabs
  }, [activeTab]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setDisplayedCount(12); // Reset displayed count when searching
  };

  const handleLoadMore = () => {
    setDisplayedCount(prev => Math.min(prev + 12, searchResults.length));
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return {
    activeTab,
    shuffledResources,
    displayedCount,
    searchQuery,
    searchResults,
    tabsWithCounts,
    getAllResources,
    handleSearchChange,
    handleLoadMore,
    handleTabChange,
  };
}
