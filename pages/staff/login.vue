<script setup lang="ts">
import { useApi } from '~/composables/useApi'
import { useAuth } from '~/composables/useAuth'
    
  const { setAuth } = useAuth()
  const { apiFetch } = useApi()
  
  const email = ref("staff@lendrehab.test")
  const password = ref("staff123")
  const error = ref<string | null>(null)
  const loading = ref(false)
  
  const submit = async () => {
  error.value = null
  loading.value = true
  try {
    const res = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })
    setAuth(res.token, res.role)
    await navigateTo('/staff/dashboard')
  } catch (e: any) {
    error.value = e?.data?.statusMessage || e?.data?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
    </script>
    
    <template>
      <div class="max-w-md space-y-4">
        <h1 class="text-2xl font-semibold">Staff Login</h1>
    
        <div class="bg-white border rounded-xl p-4 space-y-3 shadow-sm">
          <div>
            <label class="text-xs text-slate-600">Email</label>
            <input v-model="email" class="mt-1 w-full border rounded-md px-2 py-1 text-sm" />
          </div>
    
          <div>
            <label class="text-xs text-slate-600">Password</label>
            <input
              v-model="password"
              type="password"
              class="mt-1 w-full border rounded-md px-2 py-1 text-sm"
            />
          </div>
    
          <p v-if="error" class="text-xs text-rose-600">{{ error }}</p>
    
          <button
            class="w-full px-4 py-2 rounded-md bg-primary text-white text-sm disabled:opacity-60"
            :disabled="loading"
            @click="submit"
          >
            <span v-if="!loading">Sign in</span>
            <span v-else>Signing in...</span>
          </button>
        </div>
      </div>
    </template>
    