import {forwardRef} from 'react'

const InputElement = forwardRef<HTMLInputElement, any>(function InputElement(
  {
    title,
    icon,
    width,
    ...rest
  }: {
    title: string
    icon: any
    width: string
    [key: string]: any
  },
  ref,
) {
  return (
    <div className="relative mb-6">
      {icon !== '' && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </div>
      )}
      <input
        ref={ref}
        type="text"
        className={
          width +
          ' rounded-md border border-gray-200 bg-white text-sm text-gray-900 shadow-sm shadow-black/10 transition  duration-300 hover:shadow focus:border-blue-500 focus:ring-blue-500'
        }
        placeholder={title}
        {...rest}
      />
    </div>
  )
})

export default InputElement