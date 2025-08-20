import type { Domain } from "./types";

export const MOCK_DATA: Domain[] = [
  {
    id: "manufacturing",
    name: "Manufacturing",
    owner: "@manufacturing-team",
    area: "Manufacturing",
    datasets: [
      { id: "prod-data", name: "Production Data", sensitivity: "internal", quality: 70, owner: "Ops" },
      { id: "traceability", name: "Traceability", sensitivity: "internal", quality: 65, owner: "Ops" },
      { id: "line-perf", name: "Line Station Performance", sensitivity: "internal", quality: 60, owner: "Ops" },
      { id: "utilities", name: "Utilities & Energy", sensitivity: "internal", quality: 55, owner: "Ops" },
      { id: "maintenance", name: "Maintenance", sensitivity: "internal", quality: 62, owner: "Ops" }
    ]
  },
  {
    id: "supply-chain",
    name: "Supply Chain",
    owner: "@supply-team",
    area: "Supply Chain",
    datasets: [
      { id: "warehousing", name: "Warehousing", sensitivity: "internal", quality: 68, owner: "SCM" },
      { id: "transport", name: "Transport & Shipments", sensitivity: "internal", quality: 66, owner: "SCM" },
      { id: "inventory", name: "Inventory", sensitivity: "internal", quality: 70, owner: "SCM" },
      { id: "supply-chain-perf", name: "Supply Chain Perf.", sensitivity: "internal", quality: 72, owner: "SCM" },
      { id: "sqop", name: "S&OP and Supply Planning", sensitivity: "internal", quality: 65, owner: "SCM" }
    ]
  },
  {
    id: "it",
    name: "Information Technology",
    owner: "@it-team",
    area: "IT",
    datasets: [
      { id: "cybersecurity", name: "Cybersecurity", sensitivity: "restricted", quality: 78, owner: "IT" },
      { id: "identity", name: "Identity Access Mgmt", sensitivity: "restricted", quality: 70, owner: "IT" },
      { id: "architecture", name: "Architecture", sensitivity: "internal", quality: 65, owner: "IT" },
      { id: "logs", name: "Logs and Consumption KPIs", sensitivity: "internal", quality: 62, owner: "IT" }
    ]
  },
  {
    id: "hr",
    name: "Human Resources",
    owner: "@hr-team",
    area: "HR",
    datasets: [
      { id: "employee-profile", name: "Employee Profile", sensitivity: "restricted", quality: 70, owner: "HR" },
      { id: "employee-performance", name: "Employee Performance", sensitivity: "confidential", quality: 65, owner: "HR" },
      { id: "compensation", name: "Compensation & Benefits", sensitivity: "confidential", quality: 68, owner: "HR" },
      { id: "recruiting", name: "Recruiting", sensitivity: "internal", quality: 62, owner: "HR" }
    ]
  }
];
