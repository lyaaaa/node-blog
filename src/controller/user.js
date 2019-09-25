const getUser = (data) => {
  return {
    name: `${data.account}`,
    id: 001
  }
}

module.exports = {
  getUser
}