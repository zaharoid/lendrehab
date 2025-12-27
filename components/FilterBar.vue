<!-- components/FilterBar.vue -->
<script setup lang="ts">

const props = defineProps<{
  modelValue: {
    type: string | null
    size: string | null
    date: string | null
  }
}>()

const emit = defineEmits<{
  (e: "update:modelValue", value: { type: string | null; size: string | null; date: string | null }): void
  (e: "search"): void
}>()

const updateField = (field: "type" | "size" | "date", value: string) => {
  emit("update:modelValue", { ...props.modelValue, [field]: value || null })
}
</script>

<template>
  <div class="bg-white border rounded-xl px-4 py-3 flex flex-wrap gap-3 items-end shadow-sm">
    <div class="flex flex-col">
      <label class="text-xs text-slate-500 mb-1">Device type</label>
      <input
        class="border rounded-md px-2 py-1 text-sm"
        :value="modelValue.type || ''"
        @input="updateField('type', $event.target.value)"
        placeholder="Wheelchair, crutches..."
      />
    </div>

    <div class="flex flex-col">
      <label class="text-xs text-slate-500 mb-1">Size</label>
      <input
        class="border rounded-md px-2 py-1 text-sm"
        :value="modelValue.size || ''"
        @input="updateField('size', $event.target.value)"
        placeholder="18 inch, small..."
      />
    </div>

    <div class="flex flex-col">
      <label class="text-xs text-slate-500 mb-1">Pickup date</label>
      <input
        type="date"
        class="border rounded-md px-2 py-1 text-sm"
        :value="modelValue.date || ''"
        @input="updateField('date', $event.target.value)"
      />
    </div>

    <button
      class="ml-auto inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-white text-sm"
      @click="emit('search')"
    >
      Search
    </button>
  </div>
</template>
