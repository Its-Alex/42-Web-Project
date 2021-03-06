const path = require('path')
const fs = require('fs')
const dir = path.dirname(require.main.filename) + '/pictures/'

module.exports = (req, res) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  if (!fs.existsSync(dir + req.user.id)) {
    fs.mkdirSync(dir + req.user.id)
  }
  if (req.params.id <= 0 && req.params.id > 4) {
    res.status(200)
    return res.json({
      success: false,
      error: 'False picture id'
    })
  }

  res.status(202)
  res.json({
    success: true
  })
  let base64Data = req.body.pic.replace(/^data:image\/png;base64,/, '')

  fs.writeFile(dir + req.user.id + '/' + req.params.id + '.png', base64Data, 'base64', (err) => {
    if (err) console.log(err)
  })
}
