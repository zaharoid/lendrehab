<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  status: "PENDING" | "APPROVED" | "REJECTED"
}>()

const label = computed(() => {
  if (props.status === "PENDING") return "Pending"
  if (props.status === "APPROVED") return "Approved"
  return "Rejected"
})

const classes = computed(() => {
  if (props.status === "PENDING") return "bg-amber-100 text-amber-800"
  if (props.status === "APPROVED") return "bg-emerald-100 text-emerald-800"
  return "bg-rose-100 text-rose-800"
})
</script>

<template>
  <span
    class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
    :class="classes"
  >
    {{ label }}
  </span>
</template>
