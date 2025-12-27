<script setup lang="ts">
const props = defineProps<{
  open: boolean
  title?: string
}>()

const emit = defineEmits<{
  (e: "close"): void
}>()
</script>

<template>
  <teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      @click.self="emit('close')"
    >
      <div class="bg-white rounded-xl shadow-lg max-w-md w-full mx-4">
        <div class="flex items-center justify-between border-b px-4 py-2">
          <h3 class="text-sm font-semibold text-slate-900">
            {{ title || "Confirm action" }}
          </h3>
          <button class="text-xs text-slate-500" @click="emit('close')">✕</button>
        </div>
        <div class="px-4 py-3 text-sm text-slate-700">
          <slot />
        </div>
        <div class="border-t px-4 py-2 flex justify-end gap-2">
          <button
            class="px-3 py-1 rounded-md text-xs border border-slate-300"
            @click="emit('close')"
          >
            Close
          </button>
          <slot name="actions" />
        </div>
      </div>
    </div>
  </teleport>
</template>
