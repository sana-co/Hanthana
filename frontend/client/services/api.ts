const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'

type ApiError = {
  error?: string
}

export async function getJson<TResponse>(path: string): Promise<TResponse> {
  const response = await fetch(`${apiBaseUrl}${path}`)
  const data = (await response.json()) as TResponse & ApiError

  if (!response.ok) {
    throw new Error(data.error || 'Request failed.')
  }

  return data
}

export async function postJson<TResponse>(
  path: string,
  body: Record<string, unknown>,
): Promise<TResponse> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = (await response.json()) as TResponse & ApiError

  if (!response.ok) {
    throw new Error(data.error || 'Request failed.')
  }

  return data
}
