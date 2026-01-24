// Base RGB values for chart colors
const baseColors = [
  [59, 130, 246],   // blue
  [16, 185, 129],   // green
  [249, 115, 22],   // orange
  [139, 92, 246],   // purple
  [236, 72, 153],   // pink
  [14, 165, 233],   // sky
  [245, 158, 11],   // amber
  [34, 197, 94],    // emerald
  [168, 85, 247],   // violet
  [6, 182, 212],    // cyan
  [251, 146, 60],   // orange-light
  [99, 102, 241],   // indigo
]

export const getChartColors = (opacity = 0.8) =>
  baseColors.map(([r, g, b]) => `rgba(${r}, ${g}, ${b}, ${opacity})`)

export const getChartBorderColors = () =>
  baseColors.map(([r, g, b]) => `rgba(${r}, ${g}, ${b}, 1)`)

export const chartColors = getChartColors(0.8)
export const chartBorderColors = getChartBorderColors()
