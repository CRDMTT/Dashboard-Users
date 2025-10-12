import { useState, useEffect } from 'react'

export type ApiError = {
  message: string
  status?: number
}

export async function apiFetch<T = any>(path: string, options: RequestInit = {}) {
  const base = import.meta.env.VITE_API_BASE_URL || ''
  const apiKey = import.meta.env.VITE_API_KEY || ''

  const url = base ? `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}` : path

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`

  const res = await fetch(url, { ...options, headers })
  if (!res.ok) {
    const text = await res.text()
    let payload: any = { message: text }
    try {
      payload = JSON.parse(text)
    } catch (e) {
      // keep text
    }
    const err: ApiError = { message: payload.message || res.statusText, status: res.status }
    throw err
  }
  const data = await res.json()
  return data as T
}

// Small hook example to fetch users
export function useFetchUsers(enabled = true) {
  const [data, setData] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  useEffect(() => {
    if (!enabled) return
    let mounted = true
    setLoading(true)
    apiFetch<any[]>('/users')
      .then((d) => {
        if (mounted) setData(d)
      })
      .catch((err) => {
        if (mounted) setError(err)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [enabled])

  return { data, loading, error }
}

// Helper to fetch a specific record from the supplied API example
export async function fetchRecord(id: string) {
  // example base for this specific endpoint
  const url = `https://api.myjson.online/v1/records/${id}`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    const text = await res.text()
    let payload: any = { message: text }
    try {
      payload = JSON.parse(text)
    } catch (e) {
      // ignore
    }
    const err: ApiError = { message: payload.message || res.statusText, status: res.status }
    throw err
  }

  const data = await res.json()
  return data
}

// Hook version for the provided record endpoint
export function useFetchRecord(id: string | null) {
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  useEffect(() => {
    if (!id) return
    let mounted = true
    setLoading(true)
    fetchRecord(id)
      .then((d) => {
        if (mounted) setData(d)
      })
      .catch((err) => {
        if (mounted) setError(err)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [id])

  return { data, loading, error }
}
