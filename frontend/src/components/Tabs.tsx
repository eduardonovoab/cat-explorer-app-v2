import React from "react";

interface TabsProps {
  activeTab: "explorer" | "favorites";
  setActiveTab: (tab: "explorer" | "favorites") => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center gap-4 mb-6">
      <button
        className={`px-4 py-2 rounded-lg ${
          activeTab === "explorer" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => setActiveTab("explorer")}
      >
        Explorar
      </button>
      <button
        className={`px-4 py-2 rounded-lg ${
          activeTab === "favorites" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => setActiveTab("favorites")}
      >
        Favoritos
      </button>
    </div>
  );
};

export default Tabs;
