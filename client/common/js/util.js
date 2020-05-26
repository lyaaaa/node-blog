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
    const obj = JSON.parse(item)
    return obj
  } catch (err) {
    return item
  }
}

export const getQuery = value => {
  var query = window.location.search.substring(1)
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] == value) {
      return pair[1]
    }
  }
  return ''
}
