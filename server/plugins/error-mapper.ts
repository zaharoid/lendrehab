import { HttpError } from "~/server/utils/httpError"

export default defineNitroPlugin((nitroApp) => {
  nitroApp.h3App.options.onError = (error, event) => {
    if (error instanceof HttpError) {
      setResponseStatus(event, error.statusCode)
      return {
        error: error.message,
        details: error.details ?? null
      }
    }

    setResponseStatus(event, 500)
    return {
      error: "Internal server error"
    }
  }
})
