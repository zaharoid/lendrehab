<script setup lang="ts">
  import { useApi } from "~/composables/useApi"
  import { useAuth } from "~/composables/useAuth"
  
  const { apiFetch } = useApi()
  const { isStaff } = useAuth()
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
  
  const error = ref<string | null>(null)
  const saving = ref(false)
  const deleting = ref(false)
  const isEditing = ref(false)
  
  const form = reactive({
    name: "",
    type: "",
    size: "",
    description: "",
    availableFromLocal: ""
  })
  
  const load = async () => {
    loading.value = true
    error.value = null
    try {
      device.value = await apiFetch<Device>(`/api/devices/${id}`)
    } catch (e) {
      throw createError({ statusCode: 404, statusMessage: "Device not found" })
    } finally {
      loading.value = false
    }
  }
  
  const toLocalInput = (iso: string) => {
    const d = new Date(iso)
    const pad = (n: number) => String(n).padStart(2, "0")
    const yyyy = d.getFullYear()
    const mm = pad(d.getMonth() + 1)
    const dd = pad(d.getDate())
    const hh = pad(d.getHours())
    const mi = pad(d.getMinutes())
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`
  }
  
  const startEdit = () => {
    if (!device.value) return
    form.name = device.value.name
    form.type = device.value.type
    form.size = device.value.size
    form.description = device.value.description
    form.availableFromLocal = toLocalInput(device.value.availableFrom)
    isEditing.value = true
    error.value = null
  }
  
  const cancelEdit = () => {
    isEditing.value = false
    error.value = null
  }
  
  const save = async () => {
    if (!device.value) return
    error.value = null
    saving.value = true
  
    try {
      const payload: any = {
        name: form.name,
        type: form.type,
        size: form.size,
        description: form.description
      }
  
      if (form.availableFromLocal) {
        payload.availableFrom = new Date(form.availableFromLocal).toISOString()
      }
  
      const updated = await apiFetch<Device>(`/api/devices/${id}`, {
        method: "PATCH",
        body: payload
      })
  
      device.value = updated
      isEditing.value = false
    } catch (e: any) {
      const issues = e?.data?.data?.issues || e?.data?.issues
      if (Array.isArray(issues) && issues.length) {
        error.value = issues.map((i: any) => `${i.path}: ${i.message}`).join("; ")
      } else if (e?.data?.statusMessage) {
        error.value = e.data.statusMessage
      } else {
        error.value = "Failed to update device."
      }
    } finally {
      saving.value = false
    }
  }
  
  const removeDevice = async () => {
    if (!device.value) return
    error.value = null
  
    const ok = confirm(`Delete device "${device.value.name}"? This cannot be undone.`)
    if (!ok) return
  
    deleting.value = true
    try {
      await apiFetch(`/api/devices/${id}`, { method: "DELETE" })
      await navigateTo("/")
    } catch (e: any) {
      if (e?.data?.statusMessage) error.value = e.data.statusMessage
      else error.value = "Failed to delete device."
    } finally {
      deleting.value = false
    }
  }
  
  await load()
  </script>
  
  <template>
    <div v-if="loading" class="text-sm text-slate-600">Loading...</div>
  
    <div v-else-if="device" class="space-y-5">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h1 class="text-2xl font-semibold text-slate-900">
            {{ device.name }}
          </h1>
          <p class="text-sm text-slate-600 mt-1">Device ID: {{ device.id }}</p>
        </div>
          <div v-if="isStaff" class="flex gap-2">
          <button
            v-if="!isEditing"
            class="text-sm px-3 py-2 rounded-md border border-slate-300 bg-white hover:bg-slate-50"
            @click="startEdit"
          >
            Edit
          </button>
  
          <button
            v-if="!isEditing"
            class="text-sm px-3 py-2 rounded-md border border-red-300 bg-white hover:bg-red-50 text-red-700"
            :disabled="deleting"
            @click="removeDevice"
          >
            <span v-if="deleting">Deleting…</span>
            <span v-else>Delete</span>
          </button>
        </div>
      </div>
  
      <div v-if="error" class="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
        {{ error }}
      </div>
        <div v-if="isStaff && isEditing" class="border rounded-xl bg-white shadow-sm p-5 space-y-4">
        <h2 class="text-lg font-semibold text-slate-900">Edit device</h2>
  
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-700">Name</label>
            <input v-model.trim="form.name" class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
          </div>
  
          <div>
            <label class="block text-sm font-medium text-slate-700">Type</label>
            <input v-model.trim="form.type" class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
          </div>
  
          <div>
            <label class="block text-sm font-medium text-slate-700">Size</label>
            <input v-model.trim="form.size" class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
          </div>
  
          <div>
            <label class="block text-sm font-medium text-slate-700">Available from</label>
            <input v-model="form.availableFromLocal" type="datetime-local" class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
          </div>
        </div>
  
        <div>
          <label class="block text-sm font-medium text-slate-700">Description</label>
          <textarea
            v-model.trim="form.description"
            rows="4"
            class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
  
        <div class="flex gap-2">
          <button
            class="text-sm px-4 py-2 rounded-md bg-primary text-white disabled:opacity-60"
            :disabled="saving"
            @click="save"
          >
            <span v-if="saving">Saving…</span>
            <span v-else>Save</span>
          </button>
  
          <button
            class="text-sm px-4 py-2 rounded-md border border-slate-300 bg-white hover:bg-slate-50"
            :disabled="saving"
            @click="cancelEdit"
          >
            Cancel
          </button>
        </div>
  
        <p class="text-xs text-slate-500">
          Note: only staff can edit devices. Requires Authorization header.
        </p>
      </div>
  
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="border rounded-xl bg-white shadow-sm h-60 flex items-center justify-center text-slate-400">
          Device image placeholder
        </div>
  
        <div class="space-y-4">
          <div class="text-sm text-slate-600">
            Type: <span class="font-medium">{{ device.type }}</span>
          </div>
          <div class="text-sm text-slate-600">
            Size: <span class="font-medium">{{ device.size }}</span>
          </div>
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
  