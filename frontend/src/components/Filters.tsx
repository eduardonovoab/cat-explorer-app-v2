import React from "react";

interface FiltersProps {
  search: string;
  setSearch: (value: string) => void;
  available: string;
  setAvailable: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  search,
  setSearch,
  available,
  setAvailable,
  sort,
  setSort,
}) => {
  return (
    <div className="flex flex-wrap gap-3 bg-white p-4 rounded-2xl shadow-md mb-6 justify-center">
      <input
        type="text"
        placeholder="Buscar raza..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={available}
        onChange={(e) => setAvailable(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2"
      >
        <option value="">Todas</option>
        <option value="true">Disponibles</option>
        <option value="false">No disponibles</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2"
      >
        <option value="">Ordenar</option>
        <option value="asc">Más antiguas</option>
        <option value="desc">Más recientes</option>
      </select>
    </div>
  );
};

export default Filters;
