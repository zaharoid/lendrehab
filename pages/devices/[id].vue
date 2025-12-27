<!-- pages/devices/[id].vue -->
<script setup lang="ts">
import { useApi } from '~/composables/useApi'

  const { apiFetch } = useApi()
  const route = useRoute()
  
  type Device = {
    id: number
    name: string
    type: string
    size: string
    description: string
    availableFrom: string
  }
  
  const id = Number(route.params.id)
  const device = ref<Device | null>(null)
  const loading = ref(true)
  
  try {
    device.value = await apiFetch<Device>(`/api/devices/${id}`)
  } catch (e) {
    throw createError({ statusCode: 404, statusMessage: "Device not found" })
  } finally {
    loading.value = false
  }
  </script>
  
  <template>
    <div v-if="loading" class="text-sm text-slate-600">Loading...</div>
  
    <div v-else-if="device" class="space-y-5">
      <h1 class="text-2xl font-semibold text-slate-900">
        {{ device.name }}
      </h1>
  
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="border rounded-xl bg-white shadow-sm h-60 flex items-center justify-center text-slate-400">
          Device image placeholder
        </div>
  
        <div class="space-y-4">
          <div class="text-sm text-slate-600">Type: <span class="font-medium">{{ device.type }}</span></div>
          <div class="text-sm text-slate-600">Size: <span class="font-medium">{{ device.size }}</span></div>
          <div class="text-sm text-slate-600">
            Available from: <span class="font-medium">{{ device.availableFrom.slice(0, 10) }}</span>
          </div>
  
          <p class="text-sm text-slate-700">{{ device.description }}</p>
  
          <NuxtLink
            :to="`/reserve/${device.id}`"
            class="inline-flex px-4 py-2 bg-primary text-white rounded-md text-sm"
          >
            Reserve this device
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  