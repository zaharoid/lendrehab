<script setup lang="ts">
  import { useApi } from "~/composables/useApi";
  
  const props = defineProps<{ deviceId: number; deviceName: string }>()
  const { apiFetch } = useApi()
  
  const name = ref("")
  const email = ref("")
  const phone = ref("")
  const pickup = ref("")
  const referral = ref<string | null>(null)
  const consent = ref(false)
  const isSubmitting = ref(false)
  const error = ref<string | null>(null)
  const successId = ref<number | null>(null)
  
  const submit = async () => {
    error.value = null
    successId.value = null
  
    if (!name.value || !email.value || !phone.value || !pickup.value || !consent.value) {
      error.value = "Please fill all required fields and accept the consent."
      return
    }
  
    isSubmitting.value = true
    try {
      const res = await apiFetch<{ id: number }>("/api/reservations", {
        method: "POST",
        body: {
          citizenName: name.value,
          email: email.value,
          phone: phone.value,
          pickupAt: new Date(pickup.value).toISOString(),
          referralFile: referral.value,
          deviceId: props.deviceId
        }
      })
      successId.value = res.id
    } catch (e: any) {
      error.value = e?.data?.error || "Failed to submit reservation."
    } finally {
      isSubmitting.value = false
    }
  }
  </script>
  