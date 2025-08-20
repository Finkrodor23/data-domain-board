export type Sensitivity = "public" | "internal" | "confidential" | "restricted";

export type Dataset = {
  id: string;
  name: string;
  description?: string;
  sensitivity: Sensitivity;
  quality: number;
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
