interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function TextField({ label, ...props }: TextFieldProps) {
  return (
    <div>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>
      <input
        type='text'
        {...props}
        className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
      />
    </div>
  );
}
