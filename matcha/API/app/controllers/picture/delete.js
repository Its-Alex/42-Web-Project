const path = require('path')
const fs = require('fs')
const dir = path.dirname(require.main.filename) + '/pictures/'

module.exports = (req, res) => {
  if (fs.existsSync(dir + req.user.id + '/' + req.params.id + '.png')) {
    fs.unlink(fs.existsSync(dir + req.user.id + '/' + req.params.id + '.png'))
    return res.json({
      success: true
    })
  }
  res.json({
    success: false,
    error: 'No picture found'
  })
}
