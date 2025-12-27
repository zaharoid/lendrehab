<script setup lang="ts">
const props = defineProps<{
  id: number
  name: string
  type: string
  size: string
  availableFrom: string
}>()
</script>

<template>
  <div class="border rounded-xl bg-white p-4 flex flex-col gap-2 shadow-sm">
    <div class="font-medium text-slate-900">{{ name }}</div>
    <div class="text-xs text-slate-500">
      {{ type }} · Size: {{ size }}
    </div>
    <div class="text-xs text-slate-600">
      Available from:
      <span class="font-medium">{{ availableFrom }}</span>
    </div>

    <NuxtLink
      :to="`/devices/${id}`"
      class="mt-2 inline-flex items-center justify-center px-3 py-1.5 text-sm rounded-md bg-primary text-white"
    >
      View details
    </NuxtLink>
  </div>
</template>
