const getUser = (data) => {
  return {
    name: `${data.account}`,
    id: 1
  }
}

module.exports = {
  getUser
}