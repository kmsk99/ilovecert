interface ColorFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ColorField({ label, name, value, onChange }: ColorFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="color"
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1"
        />
        <input
          type="text"
          value={value}
          onChange={onChange}
          name={name}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
} 