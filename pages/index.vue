<!-- pages/index.vue -->
<script setup lang="ts">
  import FilterBar from "~/components/FilterBar.vue"
  import DeviceCard from "~/components/DeviceCard.vue"
import { useApi } from "~/composables/useApi"
  
  const { apiFetch } = useApi()
  
  const filters = ref({
    type: null as string | null,
    size: null as string | null,
    date: null as string | null
  })
  
  type Device = {
    id: number
    name: string
    type: string
    size: string
    description: string
    availableFrom: string
  }
  
  const devices = ref<Device[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)
  
  const load = async () => {
    loading.value = true
    error.value = null
    try {
      devices.value = await apiFetch<Device[]>("/api/devices")
    } catch (e: any) {
      error.value = e?.data?.error || "Failed to load devices"
    } finally {
      loading.value = false
    }
  }
  
  await load()
  
  const filtered = computed(() => {
    return devices.value.filter((d) => {
      const okType =
        !filters.value.type || d.type.toLowerCase().includes(filters.value.type.toLowerCase())
      const okSize =
        !filters.value.size || d.size.toLowerCase().includes(filters.value.size.toLowerCase())
      const okDate =
        !filters.value.date || new Date(d.availableFrom) >= new Date(filters.value.date)
      return okType && okSize && okDate
    })
  })
  
  const search = () => {}
  </script>
  
  <template>
    <div class="space-y-6">
      <h1 class="text-2xl font-semibold text-slate-900">
        Search available rehabilitation equipment
      </h1>
  
      <FilterBar v-model="filters" @search="search" />
  
      <div v-if="loading" class="text-sm text-slate-600">Loading devices...</div>
      <div v-else-if="error" class="text-sm text-rose-600">{{ error }}</div>
  
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DeviceCard
          v-for="d in filtered"
          :key="d.id"
          :id="d.id"
          :name="d.name"
          :type="d.type"
          :size="d.size"
          :availableFrom="d.availableFrom.slice(0, 10)"
        />
      </div>
    </div>
  </template>
  