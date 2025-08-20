import * as React from "react";

export function Card({ className="", children }: React.PropsWithChildren<{className?: string}>) {
  return <div className={`rounded-2xl border border-slate-200 bg-white ${className}`}>{children}</div>;
}
export function CardHeader({ className="", children }: React.PropsWithChildren<{className?: string}>) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
export function CardContent({ className="", children }: React.PropsWithChildren<{className?: string}>) {
  return <div className={`p-4 pt-0 ${className}`}>{children}</div>;
}
export function CardTitle({ className="", children }: React.PropsWithChildren<{className?: string}>) {
  return <h3 className={`font-semibold ${className}`}>{children}</h3>;
}

export function Button({ className="", children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm shadow-sm hover:shadow transition ${className}`} {...props}>{children}</button>;
}

export function Badge({ className="", children }: React.PropsWithChildren<{className?: string}>) {
  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${className}`}>{children}</span>;
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring focus:ring-slate-200 ${props.className||""}`} />;
}

export function Label({children, htmlFor, className=""}:{children: React.ReactNode; htmlFor?: string; className?: string}){
  return <label htmlFor={htmlFor} className={`block text-sm text-slate-600 mb-1 ${className}`}>{children}</label>;
}

export function Checkbox({className="", ...props}: React.InputHTMLAttributes<HTMLInputElement>){
  return <input type="checkbox" {...props} className={`h-4 w-4 rounded border ${className}`} />;
}

export function Range({className="", ...props}: React.InputHTMLAttributes<HTMLInputElement>){
  return <input type="range" {...props} className={`w-full ${className}`} />;
}

export function Select({value, onChange, children, className=""}:{value: string; onChange:(v:string)=>void; children:React.ReactNode; className?:string}){
  return <select value={value} onChange={(e)=>onChange(e.target.value)} className={`w-full rounded-xl border px-3 py-2 text-sm ${className}`}>{children}</select>;
}
export function Option({value, children}:{value:string; children:React.ReactNode}){
  return <option value={value}>{children}</option>;
}
