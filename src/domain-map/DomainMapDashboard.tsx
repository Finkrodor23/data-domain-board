import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, LayoutGrid, Info, ListChecks, X } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, Button, Badge, Input, Label, Checkbox, Range, Select, Option } from "@/components/ui";
import { MOCK_DATA } from "./data";
import { filterDatasets, countDatasets } from "./filters";
import type { Dataset, Sensitivity } from "./types";
import { SENS_COLORS, qualityToClass } from "./theme";

const ALL = "__ALL__";

export default function DomainMapDashboard() {
  const [q, setQ] = useState("");
  const [sensitivity, setSensitivity] = useState<Sensitivity | undefined>();
  const [owner, setOwner] = useState<string | undefined>();
  const [minQuality, setMinQuality] = useState(40);
  const [showLegends, setShowLegends] = useState(true);
  const [view, setView] = useState<"overview" | "sensitivity" | "quality">("overview");
  const [selected, setSelected] = useState<Dataset | null>(null);

  const owners = useMemo(() => {
    const set = new Set<string>();
    MOCK_DATA.forEach((d) => d.datasets.forEach((ds) => set.add(ds.owner)));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => filterDatasets(MOCK_DATA, { text: q, sensitivity, owner, minQuality }), [q, sensitivity, owner, minQuality]);
  const total = useMemo(() => countDatasets(MOCK_DATA), []);
  const visible = useMemo(() => countDatasets(filtered), [filtered]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Data Domain Map</h1>
            <p className="text-slate-500">Interactive overview of domains & datasets – with filters and multiple views.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="border-slate-300" onClick={() => setShowLegends(v => !v)}>
              <Eye className="h-4 w-4" /> Legend {showLegends ? "off" : "on"}
            </Button>
          </div>
        </header>

        {/* Filters */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><span className="inline-flex"><LayoutGrid className="h-4 w-4"/></span> Filters & Views</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="search">Search</Label>
              <Input id="search" placeholder="Dataset, description, tag…" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <div>
              <Label>Owner</Label>
              <Select value={owner ?? ALL} onChange={(v) => setOwner(v === ALL ? undefined : v)}>
                <Option value={ALL}>All</Option>
                {owners.map((o) => <Option key={o} value={o}>{o}</Option>)}
              </Select>
            </div>
            <div>
              <Label>Sensitivity</Label>
              <Select value={(sensitivity ?? ALL) as string} onChange={(v) => setSensitivity(v === ALL ? undefined : (v as Sensitivity))}>
                <Option value={ALL}>All</Option>
                <Option value="public">Public</Option>
                <Option value="internal">Internal</Option>
                <Option value="confidential">Confidential</Option>
                <Option value="restricted">Restricted</Option>
              </Select>
            </div>
            <div>
              <Label>Min. Data Quality: {minQuality}</Label>
              <Range min={0} max={100} step={1} value={minQuality} onChange={(e:any)=>setMinQuality(parseInt(e.target.value))}/>
            </div>
            <div className="md:col-span-5 flex items-center gap-4 text-sm text-slate-500">
              <span>{visible} of {total} datasets visible</span>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-emerald-500"></span>Public/High</span>
                <span className="inline-flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-blue-500"></span>Internal/Good</span>
                <span className="inline-flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-amber-500"></span>Confidential/Medium</span>
                <span className="inline-flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-rose-600"></span>Restricted/Low</span>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox checked={showLegends} onChange={(e)=>setShowLegends(e.target.checked)} />
                <Label>Show legend</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((domain) => (
            <Card key={domain.id} className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{domain.name}</CardTitle>
                  <Badge className="border-slate-300">{domain.owner}</Badge>
                </div>
                <div className="text-xs text-slate-500">Area: {domain.area} • {domain.datasets.length} datasets</div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {domain.datasets.map((ds) => (
                    <motion.button
                      key={ds.id}
                      onClick={() => setSelected(ds)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      title={`${ds.name}\n${ds.description ?? ""}\nOwner: ${ds.owner}\nSensitivity: ${ds.sensitivity}\nQuality: ${ds.quality}`}
                      className={`relative rounded-2xl p-3 text-left shadow-sm border bg-white/80 hover:shadow-md transition ${
                        view === "sensitivity"
                          ? SENS_COLORS[ds.sensitivity]
                          : view === "quality"
                          ? qualityToClass(ds.quality)
                          : "bg-white"
                      } ${view === "overview" ? "border-slate-200" : "border-transparent text-white"}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className={`font-medium ${view === "overview" ? "text-slate-800" : "text-white"}`}>{ds.name}</div>
                          <div className={`text-xs line-clamp-2 ${view === "overview" ? "text-slate-500" : "text-white/90"}`}>{ds.description}</div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge className={`${view === "overview" ? "border-slate-300" : "border-white/50 text-white"} capitalize`}>{ds.sensitivity}</Badge>
                          <div className={`text-[10px] font-medium ${view === "overview" ? "text-slate-500" : "text-white"}`}>Q: {ds.quality}</div>
                        </div>
                      </div>
                      {showLegends && (
                        <div className="mt-2 flex items-center gap-2 text-[10px]">
                          {(ds.tags ?? []).slice(0,3).map((t) => (
                            <span key={t} className={`px-2 py-0.5 rounded-full border ${view === "overview" ? "border-slate-200 text-slate-600" : "border-white/50 text-white"}`}>#{t}</span>
                          ))}
                        </div>
                      )}
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
                  <Button className="border-0" onClick={() => setSelected(null)}><X className="h-4 w-4"/></Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-slate-700">{selected.description}</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="capitalize">{selected.sensitivity}</Badge>
                    <Badge>Quality: {selected.quality}</Badge>
                    {(selected.tags ?? []).map((t) => (
                      <Badge key={t}>#{t}</Badge>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                    {typeof selected.records === "number" && (
                      <div className="rounded-xl bg-slate-50 p-3 border"><div className="font-medium text-slate-700">Records</div><div>{selected.records.toLocaleString()}</div></div>
                    )}
                    {selected.lastUpdated && (
                      <div className="rounded-xl bg-slate-50 p-3 border"><div className="font-medium text-slate-700">Updated</div><div>{new Date(selected.lastUpdated).toLocaleDateString()}</div></div>
                    )}
                  </div>
                  <div className="text-xs text-slate-500">Tip: Click other datasets in the grid to compare here.</div>
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
