import { neon } from '@neondatabase/serverless'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const versions = query.version ? (Array.isArray(query.version) ? query.version : [query.version]) : []
  const nameFilter = (query.name as string) || ''

  const sql = neon(config.databaseUrl)

  let rows

  // Use template literals for neon queries
  if (versions.length > 0 && nameFilter) {
    // Both version and name filter
    rows = await sql`
      SELECT * FROM seeds 
      WHERE status = 1 
        AND version = ANY(${versions}) 
        AND name ILIKE ${`%${nameFilter}%`}
      ORDER BY name
    `
  } else if (versions.length > 0) {
    // Only version filter
    rows = await sql`
      SELECT * FROM seeds 
      WHERE status = 1 
        AND version = ANY(${versions})
      ORDER BY name
    `
  } else if (nameFilter) {
    // Only name filter
    rows = await sql`
      SELECT * FROM seeds 
      WHERE status = 1 
        AND name ILIKE ${`%${nameFilter}%`}
      ORDER BY name
    `
  } else {
    // No filters
    rows = await sql`
      SELECT * FROM seeds 
      WHERE status = 1
      ORDER BY name
    `
  }

  return rows
})
