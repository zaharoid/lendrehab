<script setup lang="ts">
definePageMeta({ middleware: ["staff"] })

import BarChart from "~/components/charts/BarChart.vue"
import DoughnutChart from "~/components/charts/DoughnutChart.vue"
import { useApi } from "~/composables/useApi"

const { apiFetch } = useApi()

type Stat = { labels: string[]; values: number[] }

const monthly = ref<Stat>({ labels: [], values: [] })
const byStatus = ref<Stat>({ labels: [], values: [] })

const loading = ref(true)
const error = ref<string | null>(null)

const load = async () => {
  loading.value = true
  error.value = null
  try {
    const [m, s] = await Promise.all([
      apiFetch<Stat>("/api/stats/reservations/monthly-count"),
      apiFetch<Stat>("/api/stats/reservations/by-status")
    ])
    monthly.value = m
    byStatus.value = s
  } catch (e: any) {
    error.value = e?.data?.statusMessage || e?.data?.error || "Failed to load dashboard stats"
  } finally {
    loading.value = false
  }
}

await load()

const downloadCsv = () => {
  const lines: string[] = []

  lines.push("Monthly reservations")
  lines.push("month,count")
  monthly.value.labels.forEach((label, i) => {
    lines.push(`${label},${monthly.value.values[i] ?? 0}`)
  })

  lines.push("")
  lines.push("Reservations by status")
  lines.push("status,count")
  byStatus.value.labels.forEach((label, i) => {
    lines.push(`${label},${byStatus.value.values[i] ?? 0}`)
  })

  const csv = lines.join("\n")
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = "lendrehab-dashboard.csv"
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold text-slate-900">Reporting Dashboard</h1>
        <p class="text-sm text-slate-600">
          Key operational metrics based on real reservation data.
        </p>
      </div>

      <button
        class="px-4 py-2 rounded-md bg-primary text-white text-sm"
        :disabled="loading"
        @click="downloadCsv"
      >
        Download CSV
      </button>
    </div>

    <div v-if="loading" class="text-sm text-slate-600">Loading dashboard...</div>
    <div v-else-if="error" class="text-sm text-rose-600">{{ error }}</div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="bg-white border rounded-xl p-4 shadow-sm">
        <BarChart
          :labels="monthly.labels"
          :values="monthly.values"
          title="Monthly reservations count"
        />
      </div>

      <div class="bg-white border rounded-xl p-4 shadow-sm">
        <DoughnutChart
          :labels="byStatus.labels"
          :values="byStatus.values"
          title="Reservations by status"
        />
      </div>
    </div>
  </div>
</template>
