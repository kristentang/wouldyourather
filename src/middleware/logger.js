const logger =(store) => (next) => (action) => {
  console.group(action.type)
    console.log("The action: ", action)
    const result = next(action) // next ~ dispatching actino
    console.log('The new state: ', store.getState())
  console.groupEnd()
  return result // return result from invoking next
}

export default logger
