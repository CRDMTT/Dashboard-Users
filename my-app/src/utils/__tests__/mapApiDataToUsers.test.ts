import mapApiDataToUsers from '../mapApiDataToUsers'

describe('mapApiDataToUsers', () => {
  it('maps an array of simple API objects to User[]', () => {
    const input = [
      { id: 10, first_name: 'Ana', last_name: 'G' , email: 'ana@test'},
      { uuid: 'u-2', name: 'Bobby', contact: { email: 'bob@test' } }
    ]

    const out = mapApiDataToUsers(input as any)
    expect(out).toHaveLength(2)
    expect(out[0].id).toBe('10')
    expect(out[0].name).toContain('Ana')
    expect(out[1].id).toBe('u-2')
    expect(out[1].email).toBe('bob@test')
  })

  it('handles API envelope with data array', () => {
    const input = { data: [{ _id: 'r1', firstname: 'X' }] }
    const out = mapApiDataToUsers(input as any)
    expect(out).toHaveLength(1)
    expect(out[0].id).toBe('r1')
    expect(out[0].name).toContain('X')
  })

  it('returns empty array for falsy input', () => {
    expect(mapApiDataToUsers(null as any)).toEqual([])
  })
})
