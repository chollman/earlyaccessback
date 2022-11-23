const login = async (req, res) => {
  const { user, password } = req.body

  if (!user || !password) {
    throw new Error('Provide user and password')
  }

  res.status(200).send('logueaste papaaaaaa!')
}

const signin = async (req, res) => {
  res.status(200).send('logueaste papaaaaaa!')
}

module.exports = {
  signin,
  login,
}
