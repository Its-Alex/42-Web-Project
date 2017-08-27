function error (res, data, err) {
  res.status(err)
  res.json({
    success: false,
    msg: data
  })
}

module.exports = (req, res) => {
  
}
