<script setup lang="ts">
import { Bar } from "vue-chartjs"
import { chartColors, chartBorderColors } from "~/utils/chartColors"

const props = defineProps<{
  labels: string[]
  values: number[]
  title: string
}>()

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: props.title,
      data: props.values,
      backgroundColor: chartColors.slice(0, props.values.length),
      borderColor: chartBorderColors.slice(0, props.values.length),
      borderWidth: 2,
      borderRadius: 6
    }
  ]
}))

const options = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
    title: { display: true, text: props.title }
  }
}))
</script>

<template>
  <div class="h-80">
    <Bar :data="chartData" :options="options" />
  </div>
</template>
