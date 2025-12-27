import { HttpError } from "~/server/utils/httpError"

export default defineEventHandler((event) => {
  // This file is a placeholder: Nuxt uses its own error pipeline.
  // We will standardize errors by throwing HttpError in handlers
  // and mapping it in a plugin below.
})
