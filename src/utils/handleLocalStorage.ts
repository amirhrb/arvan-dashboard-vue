//this function sets the new value and if is the same returns the old value
const handleLocalStorage = (key: string, value?: any) => {
  //1. get previous value
  const previousJson = localStorage.getItem(key)
  //2. stringify for easy compare
  const newValueJson = JSON.stringify(value)

  const previousValue = previousJson ? JSON.parse(previousJson) : null

  if (value) {
    //3. check if the value is already cached
    if (previousJson === newValueJson) {
      return value
    }
    localStorage.setItem(key, newValueJson)
    return value
  } else {
    return previousValue
  }
}
export default handleLocalStorage
