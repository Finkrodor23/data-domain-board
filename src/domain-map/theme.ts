import type { Sensitivity } from "./types";

export const SENS_COLORS: Record<Sensitivity, string> = {
  public: "bg-emerald-500",
  internal: "bg-blue-500",
  confidential: "bg-amber-500",
  restricted: "bg-rose-600",
};

export const qualityToClass = (q: number) => {
  if (q >= 80) return "bg-emerald-500";
  if (q >= 65) return "bg-blue-500";
  if (q >= 50) return "bg-amber-500";
  return "bg-rose-600";
};
