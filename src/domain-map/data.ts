import type { Domain } from "./types";

export const MOCK_DATA: Domain[] = [
  {
    id: "manufacturing",
    name: "Manufacturing",
    owner: "@manufacturing-team",
    area: "Manufacturing",
    datasets: [
      { id: "prod-data", name: "Production Data", sensitivity: "internal", quality: 92, completeness: 40, accuracy: 78, owner: "Ops" },
      { id: "traceability", name: "Traceability", sensitivity: "internal", quality: 35, completeness: 88, accuracy: 47, owner: "Ops" },
      { id: "line-perf", name: "Line Station Performance", sensitivity: "internal", quality: 55, completeness: 22, accuracy: 63, owner: "Ops" },
      { id: "utilities", name: "Utilities & Energy", sensitivity: "internal", quality: 18, completeness: 60, accuracy: 95, owner: "Ops" },
      { id: "maintenance", name: "Maintenance", sensitivity: "internal", quality: 73, completeness: 99, accuracy: 32, owner: "Ops" }
    ]
  },
  {
    id: "supply-chain",
    name: "Supply Chain",
    owner: "@supply-team",
    area: "Supply Chain",
    datasets: [
      { id: "warehousing", name: "Warehousing", sensitivity: "internal", quality: 12, completeness: 58, accuracy: 90, owner: "SCM" },
      { id: "transport", name: "Transport & Shipments", sensitivity: "internal", quality: 80, completeness: 31, accuracy: 66, owner: "SCM" },
      { id: "inventory", name: "Inventory", sensitivity: "internal", quality: 47, completeness: 72, accuracy: 15, owner: "SCM" },
      { id: "supply-chain-perf", name: "Supply Chain Perf.", sensitivity: "internal", quality: 99, completeness: 45, accuracy: 55, owner: "SCM" },
      { id: "sqop", name: "S&OP and Supply Planning", sensitivity: "internal", quality: 28, completeness: 81, accuracy: 39, owner: "SCM" }
    ]
  },
  {
    id: "it",
    name: "Information Technology",
    owner: "@it-team",
    area: "IT",
    datasets: [
      { id: "cybersecurity", name: "Cybersecurity", sensitivity: "restricted", quality: 65, completeness: 12, accuracy: 99, owner: "IT" },
      { id: "identity", name: "Identity Access Mgmt", sensitivity: "restricted", quality: 44, completeness: 93, accuracy: 51, owner: "IT" },
      { id: "architecture", name: "Architecture", sensitivity: "internal", quality: 88, completeness: 27, accuracy: 70, owner: "IT" },
      { id: "logs", name: "Logs and Consumption KPIs", sensitivity: "internal", quality: 23, completeness: 55, accuracy: 82, owner: "IT" }
    ]
  },
  {
    id: "hr",
    name: "Human Resources",
    owner: "@hr-team",
    area: "HR",
    datasets: [
      { id: "employee-profile", name: "Employee Profile", sensitivity: "restricted", quality: 38, completeness: 100, accuracy: 64, owner: "HR" },
      { id: "employee-performance", name: "Employee Performance", sensitivity: "confidential", quality: 91, completeness: 14, accuracy: 44, owner: "HR" },
      { id: "compensation", name: "Compensation & Benefits", sensitivity: "confidential", quality: 59, completeness: 37, accuracy: 87, owner: "HR" },
      { id: "recruiting", name: "Recruiting", sensitivity: "internal", quality: 76, completeness: 62, accuracy: 20, owner: "HR" }
    ]
  }
];
