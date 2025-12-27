<script setup lang="ts">
  import ReservationForm from "~/components/ReservationForm.vue"
import { useApi } from "~/composables/useApi";
  const { apiFetch } = useApi()
  const route = useRoute()
  
  type Device = { id: number; name: string }
  
  const id = Number(route.params.id)
  const device = ref<Device | null>(null)
  
  try {
    device.value = await apiFetch<Device>(`/api/devices/${id}`)
  } catch (e) {
    throw createError({ statusCode: 404, statusMessage: "Device not found" })
  }
  </script>
  
  <template>
    <div class="max-w-2xl space-y-4">
      <h1 class="text-2xl font-semibold text-slate-900">
        Reserve: {{ device?.name }}
      </h1>
  
      <ReservationForm v-if="device" :deviceId="device.id" :deviceName="device.name" />
    </div>
  </template>
  