import React, { useState, useMemo } from "react";
import azkarData from "./assets/azkar.json";
import "./App.css";

// Parse azkar rows into objects
const azkarRows = azkarData.rows.map((row) => ({
  category: row[0],
  zekr: row[1],
  description: row[2],
  count: row[3],
  reference: row[4],
  search: row[5],
}));

const categories = Array.from(new Set(azkarRows.map((z) => z.category)));

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [search, setSearch] = useState("");
  const [counters, setCounters] = useState({});

  const filteredAzkar = useMemo(() =>
    azkarRows.filter(
      (z) =>
        z.category === selectedCategory &&
        (z.zekr.includes(search) || z.description.includes(search) || z.reference.includes(search))
    ),
    [selectedCategory, search]
  );

  const handleCount = (idx, max) => {
    setCounters((prev) => {
      const current = prev[idx] || 0;
      if (current < max) {
        return { ...prev, [idx]: current + 1 };
      }
      return prev;
    });
  };

  return (
    <div className="azkar-app">
      <h1>Azkary By Islam El-lithy</h1>
      <div className="category-list">
        {categories.map((cat) => (
          <button
            key={cat}
            className={cat === selectedCategory ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="بحث..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <div className="azkar-list">
        {filteredAzkar.map((z, idx) => (
          <div className="azkar-card" key={idx}>
            <div className="zekr">{z.zekr}</div>
            {z.description && <div className="desc">{z.description}</div>}
            {z.reference && <div className="ref">{z.reference}</div>}
            <div className="counter-row">
              <button
                onClick={() => handleCount(idx, z.count || 1)}
                disabled={(counters[idx] || 0) >= (z.count || 1)}
              >
                {counters[idx] || 0} / {z.count || 1}
              </button>
            </div>
          </div>
        ))}
        {filteredAzkar.length === 0 && <div>لا يوجد أذكار</div>}
      </div>
    </div>
  );
}

export default App;
