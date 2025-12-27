<!-- pages/staff/request/[id].vue -->
<script setup lang="ts">
  definePageMeta({ middleware: ["staff"] })
  
  import StatusBadge from "~/components/StatusBadge.vue"
  import Modal from "~/components/Modal.vue"
import { useApi } from "~/composables/useApi"
  
  const { apiFetch } = useApi()
  const route = useRoute()
  const id = Number(route.params.id)
  
  type Details = {
    id: number
    citizenName: string
    email: string
    phone: string
    pickupAt: string
    status: "PENDING" | "APPROVED" | "REJECTED"
    deviceId: number
    deviceName: string
    referralFile?: string | null
  }
  
  const req = ref<Details | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)
  
  const modal = ref<"approve" | "reject" | null>(null)
  const rejectReason = ref("")
  
  const load = async () => {
    loading.value = true
    error.value = null
    try {
      req.value = await apiFetch<Details>(`/api/reservations/${id}`)
    } catch (e: any) {
      error.value = e?.data?.error || "Failed to load reservation"
    } finally {
      loading.value = false
    }
  }
  
  const updateStatus = async (status: "APPROVED" | "REJECTED") => {
    if (!req.value) return
    try {
      await apiFetch(`/api/reservations/${id}/status`, {
        method: "PATCH",
        body: { status }
      })
      await load()
    } catch (e: any) {
      error.value = e?.data?.error || "Failed to update status"
    } finally {
      modal.value = null
    }
  }
  
  await load()
  </script>
  
  <template>
    <div class="space-y-6 max-w-3xl">
      <div v-if="loading" class="text-sm text-slate-600">Loading...</div>
      <div v-else-if="error" class="text-sm text-rose-600">{{ error }}</div>
  
      <template v-else-if="req">
        <h1 class="text-2xl font-semibold text-slate-900">
          Reservation {{ req.id }} details
        </h1>
  
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2 bg-white p-4 border rounded-xl shadow-sm">
            <h3 class="font-semibold text-slate-900 text-sm mb-2">Citizen</h3>
            <p class="text-sm text-slate-600">Name: {{ req.citizenName }}</p>
            <p class="text-sm text-slate-600">Email: {{ req.email }}</p>
            <p class="text-sm text-slate-600">Phone: {{ req.phone }}</p>
            <p class="text-sm text-slate-600">Pickup: {{ req.pickupAt }}</p>
  
            <div class="flex items-center gap-2 mt-2">
              <span class="text-sm text-slate-600">Status:</span>
              <StatusBadge :status="req.status" />
            </div>
          </div>
  
          <div class="space-y-2 bg-white p-4 border rounded-xl shadow-sm">
            <h3 class="font-semibold text-slate-900 text-sm mb-2">Device</h3>
            <p class="text-sm text-slate-600">{{ req.deviceName }}</p>
  
            <div class="mt-4">
              <h3 class="font-semibold text-slate-900 text-sm">Uploaded referral</h3>
              <p class="text-xs text-slate-500 mt-1">
                {{ req.referralFile ? req.referralFile : "No file uploaded" }}
              </p>
            </div>
          </div>
        </div>
  
        <div class="flex gap-4">
          <button
            class="px-4 py-2 bg-emerald-600 text-white text-sm rounded-md"
            @click="modal = 'approve'"
          >
            Approve
          </button>
  
          <button
            class="px-4 py-2 bg-rose-600 text-white text-sm rounded-md"
            @click="modal = 'reject'"
          >
            Reject
          </button>
        </div>
  
        <Modal v-if="modal === 'approve'" :open="true" title="Approve request" @close="modal = null">
          This will mark reservation {{ req.id }} as approved.
          <template #actions>
            <button
              class="px-3 py-1 bg-emerald-600 text-white rounded-md text-xs"
              @click="updateStatus('APPROVED')"
            >
              Confirm
            </button>
          </template>
        </Modal>
  
        <Modal v-if="modal === 'reject'" :open="true" title="Reject request" @close="modal = null">
          <input
            v-model="rejectReason"
            placeholder="Enter rejection reason (UI only)"
            class="border rounded-md px-2 py-1 w-full text-sm"
          />
          <template #actions>
            <button
              class="px-3 py-1 bg-rose-600 text-white rounded-md text-xs"
              @click="updateStatus('REJECTED')"
            >
              Confirm
            </button>
          </template>
        </Modal>
      </template>
    </div>
  </template>
  