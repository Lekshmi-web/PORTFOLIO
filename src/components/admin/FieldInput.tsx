"use client";

import type { Field } from "@/lib/admin/collections";
import { ImageField } from "./ImageField";

interface FieldInputProps {
  field: Field;
  value: unknown;
  folder: string;
}

export function FieldInput({ field, value, folder }: FieldInputProps) {
  const id = `f-${field.name}`;
  const str = value === null || value === undefined ? "" : Array.isArray(value) ? value.join(", ") : String(value);

  if (field.type === "boolean") {
    return (
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={field.name}
          type="checkbox"
          defaultChecked={Boolean(value)}
          className="mt-0.5 size-5 accent-violet"
        />
        <label htmlFor={id} className="text-sm">
          <span className="font-medium">{field.label}</span>
          {field.help && <span className="block text-ink/60">{field.help}</span>}
        </label>
      </div>
    );
  }

  let control: React.ReactNode;
  switch (field.type) {
    case "textarea":
      control = <textarea id={id} name={field.name} defaultValue={str} rows={field.name.includes("long") || field.name === "details" ? 8 : 4} className="field" required={field.required} />;
      break;
    case "image":
      control = (
        <ImageField
          name={field.name}
          defaultValue={str || null}
          folder={folder}
          accept={field.name === "resume_url" ? "application/pdf" : "image/*"}
        />
      );
      break;
    case "select":
      control = (
        <select id={id} name={field.name} defaultValue={str || field.options?.[0]} className="field" required={field.required}>
          {!field.required && <option value="">—</option>}
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
          {str && !field.options?.includes(str) && <option value={str}>{str}</option>}
        </select>
      );
      break;
    case "number":
      control = <input id={id} name={field.name} type="number" defaultValue={str || "0"} className="field max-w-[140px]" />;
      break;
    case "date":
      control = <input id={id} name={field.name} type="date" defaultValue={str.slice(0, 10)} className="field max-w-[220px]" />;
      break;
    case "url":
      control = <input id={id} name={field.name} type="url" defaultValue={str} placeholder="https://" className="field" />;
      break;
    default:
      control = <input id={id} name={field.name} type="text" defaultValue={str} className="field" required={field.required} />;
  }

  return (
    <div>
      {field.type === "image" ? (
        <p className="label">{field.label}</p>
      ) : (
        <label htmlFor={id} className="label">
          {field.label}
          {field.required && <span className="text-coral"> *</span>}
        </label>
      )}
      {control}
      {field.help && <p className="mt-1 text-xs text-ink/55">{field.help}</p>}
    </div>
  );
}
