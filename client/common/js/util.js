export const setStorage = (key, val) => {
  if (typeof val === 'object') {
    window.localStorage.setItem(key, JSON.stringify(val))
  } else {
    window.localStorage.setItem(key, val)
  }
}

export const getStorage = key => {
  const item = window.localStorage.getItem(key) || ''
  try {
    const obj = JSON.parse(objStr)
    return obj
  } catch (err) {
    return item
  }
}
