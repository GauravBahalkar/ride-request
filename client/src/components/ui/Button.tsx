import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-500',
  secondary: 'bg-white text-slate-900 border border-slate-300 hover:bg-slate-50',
  danger: 'bg-rose-500 text-white hover:bg-rose-400',
}

export const Button = ({ className, variant = 'primary', ...props }: Props) => {
  return (
    <button
      className={cn(
        'rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:scale-100',
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  )
}
