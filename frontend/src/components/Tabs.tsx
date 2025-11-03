import React from "react";

interface TabsProps {
  activeTab: "explorer" | "favorites";
  setActiveTab: (tab: "explorer" | "favorites") => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center gap-2 mb-6">
      <button
        className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
          activeTab === "explorer" 
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50 scale-105" 
            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-blue-300"
        }`}
        onClick={() => setActiveTab("explorer")}
      >
        🔍 Explorar
      </button>
      <button
        className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
          activeTab === "favorites" 
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50 scale-105" 
            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-blue-300"
        }`}
        onClick={() => setActiveTab("favorites")}
      >
        ⭐ Favoritos
      </button>
    </div>
  );
};

export default Tabs;