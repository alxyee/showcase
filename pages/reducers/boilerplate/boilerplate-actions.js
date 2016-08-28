export const BOILERPLATE_ACTION = 'BOILERPLATE_ACTION'
export const boilerplateAction = () =>({type: 'BOILERPLATE_ACTION'})

export function boilerplateThunk() {
  return function (dispatch, getState) {
    const state = getState()
    console.log(`THUNK EXAMPLE ${state}`)
  }
}
