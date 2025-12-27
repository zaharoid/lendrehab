<script setup lang="ts">
  import { ref, onMounted } from "vue"
  
  const el = ref<HTMLElement | null>(null)
  
  onMounted(async () => {
    // swagger-ui-dist включает готовый bundle (без типов, но нам и не надо)
    const SwaggerUIBundle = (await import("swagger-ui-dist/swagger-ui-bundle")).default
  
    SwaggerUIBundle({
      domNode: el.value!,
      url: "/openapi.yaml",        // <-- берём YAML как статический файл
      docExpansion: "list",
      deepLinking: true,
      persistAuthorization: true
    })
  })
  </script>
  
  <template>
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold">API Documentation</h1>
  
        <a
          href="/openapi.yaml"
          target="_blank"
          class="text-sm px-3 py-2 rounded-md border border-slate-300 bg-white hover:bg-slate-50"
        >
          Open raw OpenAPI
        </a>
      </div>
  
      <ClientOnly>
        <div ref="el" class="bg-white rounded-xl border overflow-hidden"></div>
        <template #fallback>
          <div class="text-sm text-slate-600">Loading Swagger UI…</div>
        </template>
      </ClientOnly>
    </div>
  </template>
  
  <style>
  .swagger-ui .topbar { display: none; }
  </style>
  