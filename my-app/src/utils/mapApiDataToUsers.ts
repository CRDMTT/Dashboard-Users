import type { User } from '../types/user'

export function mapApiDataToUsers(apiData: any): User[] {
  if (!apiData) return []
  let items: any[] = []
  if (Array.isArray(apiData)) items = apiData
  else if (apiData.data && Array.isArray(apiData.data)) items = apiData.data
  else if (apiData.records && Array.isArray(apiData.records)) items = apiData.records
  else if (apiData.items && Array.isArray(apiData.items)) items = apiData.items
  else items = [apiData]

  return items.map((r: any, idx: number) => {
    const id = String(r.id ?? r.uuid ?? r._id ?? r.recordId ?? `${idx}-${Date.now()}`)
    const first = r.first_name || r.firstname || r.firstName
    const last = r.last_name || r.lastname || r.lastName
    const name = (first || last) ? `${(first || '').trim()} ${(last || '').trim()}`.trim() : (r.name || r.fullName || r.title || r.username || 'API User')
    const jobTitle = r.job_title || r.jobTitle || r.position || r.job || r.title || '-'
    const location = r.location || r.userLocation || undefined
    const gender = r.gender || r.userGender || undefined
    const role = r.role || r.userRole || undefined
    const email = r.email || r.contact?.email || ''
    const phone = r.telephone || r.phone || r.contact?.phone || ''
    const avatar = r.avatar || r.picture || r.image || ''
    const ipAddress = r.ip_address || r.ip || undefined
    const iban = r.iban || r.bankIban || undefined
    const country = r.country || r.country_name || undefined
    const countryCode = r.country_code || r.countryCode || undefined
    const language = r.language || r.lang || undefined
    const postalCode = r.postal_code || r.postalCode || undefined
    const companyName = r.company_name || r.company || undefined
    const streetAddress = r.street_address || r.streetAddress || undefined
    const department = r.department || r.dept || undefined
    const username = r.username || r.user || undefined
    const timeZone = r.time_zone || r.timeZone || undefined

    return {
      id: String(id),
      name,
      jobTitle,
      location,
      gender,
      role,
      email,
      phone,
      avatar,
      ipAddress,
      iban,
      country,
      countryCode,
      language,
      postalCode,
      companyName,
      streetAddress,
      department,
      username,
      timeZone,
    } as User
  })
}

export default mapApiDataToUsers
