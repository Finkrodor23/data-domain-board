import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, X } from "lucide-react";
import { 
  Card, CardHeader, CardContent, CardTitle, 
  Button, Badge, Input, Label, Checkbox, Select, Option 
} from "@/components/ui";
import { MOCK_DATA } from "./data";
import { filterDatasets, countDatasets } from "./filters";
import type { Dataset, Sensitivity } from "./types";

// Continuous color scale: 0=red, 50=yellow, 100=green
function valueToColor(value: number): string {
  const clamped = Math.max(0, Math.min(100, value));
  const hue = (clamped / 100) * 120; // 0→red, 120→green
  return `hsl(${hue}, 80%, 50%)`;
}

const ALL = "__ALL__";

export default function DomainMapDashboard() {
  const [q, setQ] = useState("");
  const [sensitivity, setSensitivity] = useState<Sensitivity | undefined>();
  const [owner, setOwner] = useState<string | undefined>();
  const [minQuality, setMinQuality] = useState(0); // keep, but not shown for now
  const [showLegends, setShowLegends] = useState(true);
  const [selected, setSelected] = useState<Dataset | null>(null);
  const [metric, setMetric] = useState<"quality" | "completeness" | "accuracy" | null>(null);

  const owners = useMemo(() => {
    const set = new Set<string>();
    MOCK_DATA.forEach((d) => d.datasets.forEach((ds) => set.add(ds.owner)));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(
    () => filterDatasets(MOCK_DATA, { text: q, sensitivity, owner, minQuality }),
    [q, sensitivity, owner, minQuality]
  );

  const total = useMemo(() => countDatasets(MOCK_DATA), []);
  const visible = useMemo(() => countDatasets(filtered), [filtered]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Data Domain Map</h1>
            <p className="text-slate-500">Interactive overview of domains & datasets – with filters and metric views.</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Metric buttons */}
            <Button 
              className={metric === "quality" ? "bg-slate-800 text-white" : ""} 
              onClick={() => setMetric(metric === "quality" ? null : "quality")}
            >
              Quality
            </Button>
            <Button 
              className={metric === "completeness" ? "bg-slate-800 text-white" : ""} 
              onClick={() => setMetric(metric === "completeness" ? null : "completeness")}
            >
              Completeness
            </Button>
            <Button 
              className={metric === "accuracy" ? "bg-slate-800 text-white" : ""} 
              onClick={() => setMetric(metric === "accuracy" ? null : "accuracy")}
            >
              Accuracy
            </Button>
            <Button 
              className="border-slate-300" 
              onClick={() => setShowLegends((v) => !v)}
            >
              <Eye className="h-4 w-4" /> Legend {showLegends ? "off" : "on"}
            </Button>
          </div>
        </header>

        {/* Filters */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Filters</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <Label htmlFor="search">Search</Label>
              <Input 
                id="search" 
                placeholder="Dataset, description, tag…" 
                value={q} 
                onChange={(e) => setQ(e.target.value)} 
              />
            </div>

            {/* Sensitivity filter */}
            <div>
              <Label>Sensitivity</Label>
              <Select
                value={(sensitivity ?? ALL) as string}
                onChange={(v) => setSensitivity(v === ALL ? undefined : (v as Sensitivity))}
              >
                <Option value={ALL}>All</Option>
                <Option value="public">Public</Option>
                <Option value="internal">Internal</Option>
                <Option value="confidential">Confidential</Option>
                <Option value="restricted">Restricted</Option>
              </Select>
            </div>

            {/* Info */}
            <div className="md:col-span-5 flex items-center gap-4 text-sm text-slate-500">
              <span>{visible} of {total} datasets visible</span>
              <div className="flex items-center gap-2">
                <Checkbox 
                  checked={showLegends} 
                  onChange={(e) => setShowLegends(e.target.checked)} 
                />
                <Label>Show legend</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grid of domains */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((domain) => (
            <Card key={domain.id} className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{domain.name}</CardTitle>
                  <Badge className="border-slate-300">{domain.owner}</Badge>
                </div>
                <div className="text-xs text-slate-500">
                  Area: {domain.area} • {domain.datasets.length} datasets
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {domain.datasets.map((ds) => (
                    <motion.button
                      key={ds.id}
                      onClick={() => setSelected(ds)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative rounded-2xl p-3 text-left shadow-sm border hover:shadow-md transition ${
                        metric ? "text-white" : "bg-white border-slate-200"
                      }`}
                      style={metric ? { backgroundColor: valueToColor(ds[metric]) } : {}}
                      title={`${ds.name}\nOwner: ${ds.owner}\nQ:${ds.quality} C:${ds.completeness} A:${ds.accuracy}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className={`font-medium ${metric ? "text-white" : "text-slate-800"}`}>
                            {ds.name}
                          </div>
                          <div className={`text-xs ${metric ? "text-white/90" : "text-slate-500"}`}>
                            {ds.description}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 text-[10px] font-medium">
                          <Badge>{ds.sensitivity}</Badge>
                          <div>Q:{ds.quality} C:{ds.completeness} A:{ds.accuracy}</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Drawer */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="fixed bottom-6 right-6 left-6 md:left-auto md:w-[420px] z-50"
            >
              <Card className="shadow-lg border-slate-200">
                <CardHeader className="pb-2 flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{selected.name}</CardTitle>
                    <div className="text-xs text-slate-500">Owner: {selected.owner}</div>
                  </div>
                  <Button className="border-0" onClick={() => setSelected(null)}>
                    <X className="h-4 w-4"/>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-slate-700">{selected.description}</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="capitalize">{selected.sensitivity}</Badge>
                    <Badge>Quality: {selected.quality}</Badge>
                    <Badge>Completeness: {selected.completeness}</Badge>
                    <Badge>Accuracy: {selected.accuracy}</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-xs text-slate-500 pt-4 pb-10">
          Replace MOCK_DATA with your domains/datasets. Built with Tailwind + framer-motion. 🔧
        </div>
      </div>
    </div>
  );
}
