<script setup lang="ts">
const el = ref<HTMLElement | null>(null)

onMounted(async () => {
    const SwaggerUIBundle = (await import("swagger-ui-dist/swagger-ui-bundle")).default

    SwaggerUIBundle({
      domNode: el.value!,
      url: "/openapi.yaml",
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
  