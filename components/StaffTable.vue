<script setup lang="ts">
import StatusBadge from "./StatusBadge.vue"

const props = defineProps<{
  rows: {
    id: number
    citizenName: string
    deviceName: string
    pickupAt: string
    status: "PENDING" | "APPROVED" | "REJECTED"
  }[]
}>()
</script>

<template>
  <table class="w-full text-xs border border-slate-200 bg-white rounded-xl overflow-hidden shadow-sm">
    <thead class="bg-slate-50">
      <tr class="text-left">
        <th class="px-3 py-2">ID</th>
        <th class="px-3 py-2">Citizen</th>
        <th class="px-3 py-2">Device</th>
        <th class="px-3 py-2">Pickup</th>
        <th class="px-3 py-2">Status</th>
        <th class="px-3 py-2">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id" class="border-t border-slate-100">
        <td class="px-3 py-2">{{ row.id }}</td>
        <td class="px-3 py-2">{{ row.citizenName }}</td>
        <td class="px-3 py-2">{{ row.deviceName }}</td>
        <td class="px-3 py-2">{{ row.pickupAt }}</td>
        <td class="px-3 py-2">
          <StatusBadge :status="row.status" />
        </td>
        <td class="px-3 py-2">
          <NuxtLink
            :to="`/staff/request/${row.id}`"
            class="text-primary text-[11px] underline"
          >
            Open details
          </NuxtLink>
        </td>
      </tr>
    </tbody>
  </table>
</template>
