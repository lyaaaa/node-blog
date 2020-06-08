const getNowTime = function() {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${filterNumberTwo(year)}-${filterNumberTwo(month)}-${filterNumberTwo(
    day
  )} ${filterNumberTwo(hour)}:${filterNumberTwo(minutes)}:${filterNumberTwo(
    seconds
  )}`
}

function filterNumberTwo(num) {
  return num >= 10 ? num : '0' + num
}

module.exports = {
  getNowTime
}