import { renderHook, act } from '@testing-library/react'
import useUserActions from '../useUserActions'
import * as api from '../../api/apiClient'

type MinimalUser = { id: string; name: string }

describe('useUserActions', () => {
  const makeUsers = (): MinimalUser[] => [{ id: '1', name: 'Alice' }, { id: '2', name: 'Bob' }]

  beforeEach(() => {
    jest.spyOn(window, 'prompt').mockImplementation(() => 'Alice Edited')
    jest.spyOn(window, 'confirm').mockImplementation(() => true)
    jest.spyOn(window, 'alert').mockImplementation(() => undefined)
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('edits a user and calls patchRecord (success)', async () => {
    const users = makeUsers()
    const usersRef = { current: users }
    let state = users.slice()
    const setUsers = (u: any) => { state = u }

    const patchSpy = jest.spyOn(api, 'patchRecord').mockResolvedValue({ ok: true })

    const { result } = renderHook(() => useUserActions({ usersRef: usersRef as any, setUsers: setUsers as any, recordId: 'rec1' }))

    await act(async () => { await result.current.handleEdit('1') })

    expect(patchSpy).toHaveBeenCalled()
  const edited = state.find((u: any) => u.id === '1')
  expect(edited).toBeDefined()
  expect(edited!.name).toBe('Alice Edited')
  })

  it('reverts on edit failure and shows alert', async () => {
    const users = makeUsers()
    const usersRef = { current: users }
    let state = users.slice()
    const setUsers = (u: any) => { state = u }

    jest.spyOn(api, 'patchRecord').mockRejectedValue(new Error('fail'))
    const alertSpy = jest.spyOn(window, 'alert')

    const { result } = renderHook(() => useUserActions({ usersRef: usersRef as any, setUsers: setUsers as any, recordId: 'rec1' }))

    await act(async () => { await result.current.handleEdit('1') })

  const reverted = state.find((u: any) => u.id === '1')
  expect(reverted).toBeDefined()
  expect(reverted!.name).toBe('Alice')
    expect(alertSpy).toHaveBeenCalled()
  })

  it('deletes a user and calls patchRecord (success)', async () => {
    const users = makeUsers()
    const usersRef = { current: users }
    let state = users.slice()
    const setUsers = (u: any) => { state = u }

    const patchSpy = jest.spyOn(api, 'patchRecord').mockResolvedValue({ ok: true })

    const { result } = renderHook(() => useUserActions({ usersRef: usersRef as any, setUsers: setUsers as any, recordId: 'rec1' }))

    await act(async () => { await result.current.handleDelete('2') })

    expect(patchSpy).toHaveBeenCalled()
    expect(state.find((u: any) => u.id === '2')).toBeUndefined()
  })

  it('reverts on delete failure and shows alert', async () => {
    const users = makeUsers()
    const usersRef = { current: users }
    let state = users.slice()
    const setUsers = (u: any) => { state = u }

    jest.spyOn(api, 'patchRecord').mockRejectedValue(new Error('fail'))
    const alertSpy = jest.spyOn(window, 'alert')

    const { result } = renderHook(() => useUserActions({ usersRef: usersRef as any, setUsers: setUsers as any, recordId: 'rec1' }))

    await act(async () => { await result.current.handleDelete('2') })

    expect(state.find((u: any) => u.id === '2')).toBeDefined()
    expect(alertSpy).toHaveBeenCalled()
  })
})
