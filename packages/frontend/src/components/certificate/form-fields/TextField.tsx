interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function TextField({ label, ...props }: TextFieldProps) {
  return (
    <div className='space-y-2'>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>
      <input
        type='text'
        {...props}
        className='w-full px-4 py-2.5 rounded-xl border border-gray-200 
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                  transition-all duration-200 shadow-sm
                  placeholder:text-gray-400'
      />
    </div>
  );
}
