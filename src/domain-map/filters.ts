import type { Domain, Sensitivity } from "./types";

export type FilterParams = {
  text?: string;
  sensitivity?: Sensitivity | undefined;
  owner?: string | undefined;
  minQuality?: number;
};

export function filterDatasets(data: Domain[], params: FilterParams) {
  const text = (params.text ?? "").trim().toLowerCase();
  const minQ = params.minQuality ?? 0;
  return data.map((dom) => ({
    ...dom,
    datasets: dom.datasets.filter((ds) => {
      if (params.sensitivity && ds.sensitivity !== params.sensitivity) return false;
      if (params.owner && ds.owner !== params.owner) return false;
      if (ds.quality < minQ) return false;
      if (!text) return true;
      const hay = [ds.name, ds.description, ds.owner, ...(ds.tags ?? [])]
        .join(" ")
        .toLowerCase();
      return hay.includes(text);
    }),
  }));
}

export function countDatasets(domains: Domain[]) {
  return domains.reduce((acc, d) => acc + d.datasets.length, 0);
}
