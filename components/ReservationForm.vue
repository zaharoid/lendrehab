<script setup lang="ts">
  import { useApi } from "~/composables/useApi";
  
  const props = defineProps<{ deviceId: number; deviceName: string }>()
  const { apiFetch } = useApi()
  
  const name = ref("")
  const email = ref("")
  const phone = ref("")
  const pickup = ref("")
  const referralFile = ref<File | null>(null)
  const consent = ref(false)
  const isSubmitting = ref(false)
  const error = ref<string | null>(null)
  const successId = ref<number | null>(null)

  const onFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    referralFile.value = input.files[0]
  }
}
  
const submit = async () => {
  error.value = null
  successId.value = null

  if (!name.value || !email.value || !phone.value || !pickup.value || !consent.value) {
    error.value = "Please fill all required fields and accept the consent."
    return
  }

  isSubmitting.value = true
  try {
    const form = new FormData()
    form.append("citizenName", name.value)
    form.append("email", email.value)
    form.append("phone", phone.value)
    form.append("pickupAt", new Date(pickup.value).toISOString())
    form.append("deviceId", String(props.deviceId))

    if (referralFile.value) {
      form.append("referralFile", referralFile.value)
    }

    const res = await apiFetch<{ id: number }>("/api/reservations", {
      method: "POST",
      body: form
    })

    successId.value = res.id
  } catch (e: any) {
    const issues = e?.data?.data?.issues || e?.data?.issues
    if (Array.isArray(issues) && issues.length) {
      error.value = issues.map((i: any) => i.message).join("; ")
    } else {
      error.value = "Failed to submit reservation."
    }
  } finally {
    isSubmitting.value = false
  }
}

  </script>
  <template>
    <div class="bg-white border rounded-xl p-5 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-900">Reserve: {{ props.deviceName }}</h2>
      <p class="text-sm text-slate-600 mt-1">
        Fill in the form below to request a reservation. We’ll confirm the pickup time.
      </p>
  
      <div v-if="error" class="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
        {{ error }}
      </div>
  
      <div
        v-if="successId"
        class="mt-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800"
      >
        Reservation submitted successfully. Your request ID is <span class="font-semibold">#{{ successId }}</span>.
      </div>
  
      <form class="mt-5 space-y-4" @submit.prevent="submit">
        <div>
          <label class="block text-sm font-medium text-slate-700">
            Full name <span class="text-red-500">*</span>
          </label>
          <input
            v-model.trim="name"
            type="text"
            autocomplete="name"
            class="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="e.g., Ivan Petrov"
          />
          <p class="mt-1 text-xs text-slate-500">Minimum 2 characters.</p>
        </div>
          <div>
          <label class="block text-sm font-medium text-slate-700">
            Email <span class="text-red-500">*</span>
          </label>
          <input
            v-model.trim="email"
            type="email"
            autocomplete="email"
            class="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="name@example.com"
          />
        </div>
          <div>
          <label class="block text-sm font-medium text-slate-700">
            Phone <span class="text-red-500">*</span>
          </label>
          <input
            v-model.trim="phone"
            type="tel"
            autocomplete="tel"
            class="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="+43 123 456 789"
          />
          <p class="mt-1 text-xs text-slate-500">Minimum 6 characters.</p>
        </div>
          <div>
          <label class="block text-sm font-medium text-slate-700">
            Pickup date & time <span class="text-red-500">*</span>
          </label>
          <input
            v-model="pickup"
            type="datetime-local"
            class="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700">
            Referral file (optional)
          </label>

          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            @change="onFileChange"
            class="mt-1 block w-full text-sm text-slate-700
            file:mr-4 file:rounded-md file:border-0
            file:bg-slate-100 file:px-4 file:py-2
            file:text-sm file:font-semibold
            hover:file:bg-slate-200"
          />

          <p v-if="referralFile" class="mt-1 text-xs text-slate-600">
            Selected: {{ referralFile.name }}
          </p>

          <p class="mt-1 text-xs text-slate-500">
            Accepted formats: PDF, JPG, PNG
          </p>
        </div>
          <div class="flex items-start gap-2">
          <input
            id="consent"
            v-model="consent"
            type="checkbox"
            class="mt-1 h-4 w-4 rounded border-slate-300"
          />
          <label for="consent" class="text-sm text-slate-700">
            I consent to processing my personal data for the purpose of this reservation.
            <span class="text-red-500">*</span>
          </label>
        </div>
          <div class="flex items-center gap-3 pt-2">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span v-if="isSubmitting">Submitting…</span>
            <span v-else>Submit reservation</span>
          </button>
  
          <p class="text-xs text-slate-500">
            Device ID: <span class="font-mono">{{ props.deviceId }}</span>
          </p>
        </div>
      </form>
    </div>
  </template>
  