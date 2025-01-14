import React from 'react'

export function Tabs({ children, value, onValueChange, className = '' }: {
  children: React.ReactNode
  value: string
  onValueChange: (value: string) => void
  className?: string
}) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export function TabsList({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`flex gap-2 ${className}`}>
      {children}
    </div>
  )
}

export function TabsTrigger({ children, value, className = '' }: {
  children: React.ReactNode
  value: string
  className?: string
}) {
  return (
    <button className={`px-4 py-2 rounded hover:bg-gray-100 ${className}`}>
      {children}
    </button>
  )
}

export function TabsContent({ children, value }: { children: React.ReactNode, value: string }) {
  return (
    <div>
      {children}
    </div>
  )
}
