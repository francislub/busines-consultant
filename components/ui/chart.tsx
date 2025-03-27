import type * as React from "react"

export interface ChartTooltipContentProps {
  payload?: { name: string; value: number | string }[]
  label: string
  formatter?: (value: number | string, name: string) => React.ReactNode
}

export function ChartTooltipContent({ payload, label, formatter }: ChartTooltipContentProps) {
  if (!payload || payload.length === 0) {
    return null
  }

  return (
    <div className="rounded-md border bg-popover p-4 text-popover-foreground shadow-md">
      <div className="text-sm font-medium">{label}</div>
      <ul className="mt-2 space-y-1">
        {payload.map((item, index) => (
          <li key={index} className="flex items-center justify-between text-xs">
            <span className="mr-2">{item.name}:</span>
            <span>{formatter ? formatter(item.value, item.name) : item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export interface ChartContainerProps {
  children: React.ReactNode
}

export function ChartContainer({ children }: ChartContainerProps) {
  return <div className="w-full">{children}</div>
}

export interface ChartLegendProps {
  children: React.ReactNode
}

export function ChartLegend({ children }: ChartLegendProps) {
  return <div className="flex items-center space-x-4">{children}</div>
}

export interface ChartLegendItemProps {
  name: string
  color: string
}

export function ChartLegendItem({ name, color }: ChartLegendItemProps) {
  return (
    <div className="flex items-center space-x-2 text-sm">
      <span className="block h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      <span>{name}</span>
    </div>
  )
}

export const Chart = () => {
  return null
}

export const ChartTooltip = () => {
  return null
}
