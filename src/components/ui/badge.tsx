import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'secondary' | 'outline'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
  const variantStyles = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-700"
  }

  return (
    <span className={`${baseStyles} ${variantStyles[variant]}`}>
      {children}
    </span>
  )
}
