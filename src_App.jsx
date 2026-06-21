import React, { useState, useMemo } from 'react';

const MODULES = [
  { id: 'extractor', name: 'Extractor', costs: { iron: 10, copper: 5, quartz: 0, power: -15 } },
  { id: 'refinery', name: 'Refinery', costs: { iron: 20, copper: 0, quartz: 15, power: -30 } },
  { id: 'assembler', name: 'Assembler', costs: { iron: 0, copper: 30, quartz: 20, power: -50 } },
  { id: 'solar', name: 'Solar Array', costs: { iron: 15, quartz: 10, copper: 0, power: 40 } }
];

export default function BasePlanner() {
  const [counts, setCounts] = useState({
    extractor: 0,
    refinery: 0,
    assembler: 0,
    solar: 0
  });

  const handleUpdate = (id, value) => {
    const num = Math.max(0, parseInt(value, 10) || 0);
    setCounts(prev => ({ ...prev, [id]: num }));
  };

  const totals = useMemo(() => {
    return MODULES.reduce((acc, mod) => {
      const qty = counts[mod.id];
      acc.iron += mod.costs.iron * qty;
      acc.copper += mod.costs.copper * qty;
      acc.quartz += mod.costs.quartz * qty;
      acc.power += mod.costs.power * qty;
      return acc;
    }, { iron: 0, copper: 0, quartz: 0, power: 0 });
  }, [counts]);

  return (
    <div className="min-h-screen bg-gray-950 text-cyan-400 p-8 font-mono">
      <div className="max-w-3xl mx-auto border-2 border-cyan-500 p-8 bg-gray-900 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
        <h1 className="text-3xl font-bold mb-8 text-fuchsia-500 tracking-widest border-b border-fuchsia-900 pb-4">
          SPACECRAFT // OUTPOST LOGISTICS
        </h1>
        
        <div className="grid grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-xl border-b border-cyan-800 pb-2 text-cyan-300">Module Requisitions</h2>
            {MODULES.map(mod => (
              <div key={mod.id} className="flex justify-between items-center">
                <label className="text-gray-400 uppercase text-sm tracking-wide">{mod.name}</label>
                <input 
                  type="number" 
                  min="0"
                  value={counts[mod.id]} 
                  onChange={(e) => handleUpdate(mod.id, e.target.value)}
                  className="w-24 bg-gray-950 border border-cyan-700 text-cyan-300 px-3 py-2 outline-none focus:border-fuchsia-500 transition-colors"
                />
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-xl border-b border-cyan-800 pb-2 text-cyan-300">Resource Expenditure</h2>
            <div className="space-y-4 text-lg bg-gray-950 p-6 border border-cyan-900">
              <div className="flex justify-between">
                <span className="text-gray-500">IRON:</span> 
                <span className="text-yellow-500 font-bold">{totals.iron}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">COPPER:</span> 
                <span className="text-orange-500 font-bold">{totals.copper}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">QUARTZ:</span> 
                <span className="text-pink-500 font-bold">{totals.quartz}</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-cyan-900 mt-4">
                <span className="text-gray-500">NET POWER:</span> 
                <span className={totals.power < 0 ? 'text-red-500 font-bold' : 'text-green-500 font-bold'}>
                  {totals.power > 0 ? '+' : ''}{totals.power} MW
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
