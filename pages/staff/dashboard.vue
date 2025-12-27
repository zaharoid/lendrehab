<!-- pages/staff/dashboard.vue -->
<script setup lang="ts">
  definePageMeta({ middleware: ["staff"] })
  
  import StaffTable from "~/components/StaffTable.vue"
import { useApi } from "~/composables/useApi"
  const { apiFetch } = useApi()
  
  type Row = {
    id: number
    citizenName: string
    deviceName: string
    pickupAt: string
    status: "PENDING" | "APPROVED" | "REJECTED"
  }
  
  const rows = ref<Row[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)
  
  const load = async () => {
    loading.value = true
    error.value = null
    try {
      rows.value = await apiFetch<Row[]>("/api/reservations")
    } catch (e: any) {
      error.value = e?.data?.error || "Failed to load reservations"
    } finally {
      loading.value = false
    }
  }
  
  await load()

  </script>
  
  <template>
    <div class="space-y-6">
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-slate-900">Staff Dashboard</h1>
  
        <p class="text-sm text-slate-600">
          Overview of reservations for triage and status updates.
        </p>
        </div>
      </div>
  
      <div v-if="loading" class="text-sm text-slate-600">Loading...</div>
      <div v-else-if="error" class="text-sm text-rose-600">{{ error }}</div>
  
      <StaffTable v-else :rows="rows" />
    </div>
  </template>
  