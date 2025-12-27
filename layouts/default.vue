<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';

  const { isStaff, logout } = useAuth()
  </script>
  
  <template>
    <div class="min-h-screen flex flex-col bg-slate-50 text-slate-900">
  
      <header class="border-b bg-white shadow-sm">
        <div class="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
          <NuxtLink to="/" class="font-semibold text-primary text-lg">
            LendRehab
          </NuxtLink>
  
          <nav class="flex gap-5 text-sm font-medium text-slate-700 items-center">
            <NuxtLink to="/" class="hover:text-primary">Home</NuxtLink>
  
            <NuxtLink
              :to="isStaff ? '/staff/dashboard' : '/staff/login'"
              class="hover:text-primary"
            >
              Staff
            </NuxtLink>
  
            <button
              v-if="isStaff"
              class="text-xs px-3 py-1 rounded-md border border-slate-300"
              @click="logout()"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>
  
      <main class="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <slot />
      </main>
  
      <footer class="border-t bg-white">
        <div class="max-w-6xl mx-auto py-4 px-4 text-xs text-slate-500 flex justify-between">
          <span>© 2025 LendRehab Prototype</span>
          <span>University Coursework</span>
        </div>
      </footer>
    </div>
  </template>
  