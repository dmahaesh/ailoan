import { ChevronDownIcon } from "@/components/icons";

export function Field({
  label,
  required,
  ...rest
}: { label: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-neutral-600">
        {label}
        {required && <span className="ml-0.5 text-brand">*</span>}
      </label>
      <input
        required={required}
        {...rest}
        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
      />
    </div>
  );
}

export function Select({
  label,
  options,
  required,
  ...rest
}: { label: string; options: string[]; required?: boolean } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-neutral-600">
        {label}
        {required && <span className="ml-0.5 text-brand">*</span>}
      </label>
      <div className="relative">
        <select
          required={required}
          {...rest}
          className="w-full appearance-none rounded-xl border border-neutral-200 bg-white px-4 py-3 pr-10 text-sm text-neutral-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        >
          <option value="">Select...</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
      </div>
    </div>
  );
}

export function Textarea({
  label,
  required,
  ...rest
}: { label: string; required?: boolean } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-neutral-600">
        {label}
        {required && <span className="ml-0.5 text-brand">*</span>}
      </label>
      <textarea
        required={required}
        {...rest}
        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
      />
    </div>
  );
}
