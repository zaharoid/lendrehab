<script setup lang="ts">
    const specUrl = "/api/openapi"
    </script>
    
    <template>
      <div class="space-y-4">
        <h1 class="text-2xl font-semibold">API Documentation</h1>
    
        <div class="bg-white border rounded-xl p-4 text-sm text-slate-700">
          <p>
            OpenAPI spec is available at:
            <a class="underline" :href="specUrl" target="_blank">{{ specUrl }}</a>
          </p>
          <p class="mt-2">
            To visualize the Swagger UI, paste this URL into Swagger Editor:
          </p>
          <p class="mt-1 font-mono text-xs bg-slate-50 border rounded p-2">
            http://localhost:3000/api/openapi
          </p>
        </div>
    
        <div class="bg-white border rounded-xl p-4">
          <p class="text-sm">
            Recommended tool: https://editor.swagger.io (paste the YAML content).
          </p>
        </div>
      </div>
    </template>
    