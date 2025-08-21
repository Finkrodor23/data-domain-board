export type Sensitivity = "public" | "internal" | "confidential" | "restricted";

export type Dataset = {
  id: string;
  name: string;
  description?: string;
  sensitivity: Sensitivity;
  quality: number;       // already there
  completeness: number;  // ✅ new attribute
  accuracy: number;      // ✅ new attribute (you said “3 more attributes” – I added accuracy as a third)
  owner: string;
  tags?: string[];
  records?: number;
  lastUpdated?: string;
};

export type Domain = {
  id: string;
  name: string;
  owner: string;
  area: string;
  datasets: Dataset[];
};
