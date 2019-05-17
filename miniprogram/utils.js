function deBlocking(res) {
  return res.result.value.data
}

function questionnaireDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('/')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  deBlocking: deBlocking,
  questionnaireDate: questionnaireDate
}