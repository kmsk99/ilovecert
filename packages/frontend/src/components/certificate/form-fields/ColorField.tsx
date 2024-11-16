interface ColorFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ColorField({ label, name, value, onChange }: ColorFieldProps) {
  return (
    <div className='space-y-2'>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>
      <div className='flex items-center gap-3'>
        <input
          className='h-10 w-10 rounded-lg cursor-pointer border border-gray-200 
                    shadow-sm hover:shadow transition-shadow duration-200'
          name={name}
          type='color'
          value={value}
          onChange={onChange}
        />
        <input
          className='flex-1 px-4 py-2.5 rounded-xl border border-gray-200 
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                    transition-all duration-200 shadow-sm font-mono text-sm'
          name={name}
          type='text'
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
