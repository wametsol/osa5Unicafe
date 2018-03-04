import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  it('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })
  it('good, ok, bad is incremented', () => {
    let action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    let newState = counterReducer(state, action)
     action = {
      type: 'BAD'
    }
    newState = counterReducer(newState, action)
    action = {
      type: 'OK'
    }
    newState = counterReducer(newState, action)
    
    expect(newState).toEqual({
      good: 1,
      ok: 1,
      bad: 1
    })
  })
  it('after each increment, they can be zeroed', () => {
    
    const state = initialState

    deepFreeze(state)
    let newState = counterReducer(state, {type: 'GOOD'})
    newState = counterReducer(newState, {type: 'BAD'})
    newState = counterReducer(newState, {type: 'OK'})
    newState = counterReducer(newState, {type: 'ZERO'})
    
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})