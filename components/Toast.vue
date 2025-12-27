<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  message: string
  type?: "success" | "error" | "info"
}>()

const classes = computed(() => {
  switch (props.type) {
    case "success":
      return "bg-emerald-100 text-emerald-800 border-emerald-300"
    case "error":
      return "bg-rose-100 text-rose-800 border-rose-300"
    default:
      return "bg-slate-100 text-slate-800 border-slate-300"
  }
})
</script>

<template>
  <div
    v-if="message"
    class="fixed bottom-4 right-4 px-4 py-2 rounded-lg border text-sm shadow-md"
    :class="classes"
  >
    {{ message }}
  </div>
</template>
