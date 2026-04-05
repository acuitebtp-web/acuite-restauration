type BadgeVariant = 'green' | 'orange' | 'blue' | 'red' | 'gray'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  green:  'bg-sauge-pale text-sauge',
  orange: 'bg-orange-pale text-orange',
  blue:   'bg-blue-50 text-blue-600',
  red:    'bg-red-50 text-red-600',
  gray:   'bg-brun-pale text-brun-mid',
}

export function Badge({ variant = 'gray', children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 font-semibold text-xs px-2.5 py-1 rounded-full ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}
