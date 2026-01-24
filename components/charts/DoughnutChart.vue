<script setup lang="ts">
import { Doughnut } from "vue-chartjs"
import type { ChartOptions } from "chart.js"
import { getChartColors, chartBorderColors } from "~/utils/chartColors"

const props = defineProps<{
  labels: string[]
  values: number[]
  title: string
}>()

const colors = getChartColors(0.85)
const hoverColors = chartBorderColors

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: props.title,
      data: props.values,
      backgroundColor: colors.slice(0, props.values.length),
      hoverBackgroundColor: hoverColors.slice(0, props.values.length),
      borderColor: 'white',
      borderWidth: 3,
      hoverOffset: 8
    }
  ]
}))

const options = computed<ChartOptions<"doughnut">>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "bottom" as const },
    title: { display: true, text: props.title }
  }
}))
</script>

<template>
  <div class="h-80">
    <Doughnut :data="chartData" :options="options" />
  </div>
</template>
