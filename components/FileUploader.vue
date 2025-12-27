<script setup lang="ts">
const modelValue = defineModel<string | null>()
</script>

<template>
  <div class="border border-dashed rounded-lg px-3 py-2 bg-primaryLight/40">
    <div class="text-xs text-slate-700 mb-1">Upload referral (optional)</div>
    <input
      type="file"
      accept=".pdf,image/*"
      class="text-xs"
      @change="(e) => {
        const file = e.target?.files?.[0]
        modelValue = file ? file.name : null
      }"
    />
    <p class="text-[11px] text-slate-500 mt-1">
      PDF, JPG or PNG, max. 10 MB, one file only
    </p>
    <p v-if="modelValue" class="text-[11px] text-slate-600 mt-1">
      Selected: <span class="font-medium">{{ modelValue }}</span>
    </p>
  </div>
</template>
