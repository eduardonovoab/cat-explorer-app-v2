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
    <div className="w-full max-w-5xl mx-auto mb-8 px-4">
      {/* Barra de búsqueda - Ocupa todo el ancho */}
      <div className="relative mb-4">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
          🔍
        </div>
        <input
          type="text"
          placeholder="Buscar raza..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-all duration-200 hover:border-gray-300
                   bg-white shadow-sm placeholder:text-gray-400 text-base"
        />
      </div>

      {/* Filtros en grid - 2 columnas en desktop, 1 en mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Filtro de disponibilidad */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Disponibilidad
          </label>
          <select
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                     transition-all duration-200 hover:border-gray-300 cursor-pointer
                     bg-white shadow-sm font-medium text-gray-700"
          >
            <option value="">Todas</option>
            <option value="true">✓ Disponibles</option>
            <option value="false">✗ No disponibles</option>
          </select>
        </div>

        {/* Filtro de ordenamiento */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ordenar por
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                     transition-all duration-200 hover:border-gray-300 cursor-pointer
                     bg-white shadow-sm font-medium text-gray-700"
          >
            <option value="">Sin ordenar</option>
            <option value="asc">↑ Más antiguas</option>
            <option value="desc">↓ Más recientes</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;