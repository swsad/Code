/*
  功能：获取问卷结果（问卷名_问卷ID.xlsx格式）
  接受参数：
    qid: 问卷id
  返回情况：
    {
      success: bool 表示是否正确执行
      fileID: 在云端存储的文件ID
      error: object 错误描述
    }
*/

// 初始化
const cloud = require('wx-server-sdk')
const nodeExcel = require('excel-export')
const fs = require('fs')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  console.log('[参数]: ', event)

  try {
    const conf = {}
    // 定义sheet名称
    conf.name = "Statistics"
    // // 定义列的名称以及数据类型
    // conf.cols = [{
    //   caption: '序号',
    //   type: 'string',
    //   width: 8
    // }, {
    //   caption: '描述',
    //   type: 'string',
    //   width: 30
    // }, {
    //   caption: '次数',
    //   type: 'string',
    //   width: 8
    // }]

    const questionnaireInfos = await db.collection('questionnaire_info').where({
      _id: event.qid
    }).get()
    console.log('[questionnaire infos]', questionnaireInfos)
    const questionnaireName = questionnaireInfos.data[0].name
    console.log('[questionnaire name]:', questionnaireName)

    const questionnaire = await db.collection('questionnaire_detail').where({
      qid: event.qid
    }).get()
    const answer = await db.collection('answer').where({
      qid: event.qid
    }).get()
    console.log('[questionnaire]: ', questionnaire)
    console.log('[answer]: ', answer)

    const questions = JSON.parse(questionnaire.data[0].content)
    console.log('[questions]: ', questions)
    console.log('[questions length]: ', questions.length)
    const answers = answer.data
    console.log('[answers length]: ', answers.length)

    // 如果没有回答则抛出异常
    if (answers.length == 0) {
      throw 'no answer'
    }

    var cols = new Array()
    cols[0] = {
      caption: ' ',
      type: 'string',
      width: 5
    }
    for (var i = 0; i < questions.length; i++) {
      console.log('[description lengtg]: ', questions[i].content.description.length)
      var w = 2 * questions[i].content.description.length
      cols[i + 1] = {
        caption: questions[i].content.description,
        type: 'string',
        width: w
      }
    }
    console.log('[cols]: ', cols)
    conf.cols = cols

    var res = new Array()
    for (var i = 0; i < answers.length; i++) {
      var row = new Array()
      row[0] = i.toString()
      var temp = JSON.parse(answers[i].content)
      for (var j = 0; j < temp.length; j++) {
        row[j+1] = ''
        if (temp[j].type == 'SCQ' || temp[j].type == 'MCQ') {
          var options = temp[j].content.options
          for (var k = 0; k < options.length; k++) {
            if (options[k].isSelected == true) {
              row[j+1] = row[j+1] + '(' + k.toString() + ')'
            }
          }
        }
        else {
          row[j+1] = row[j+1] + temp[j].content.answer
        }        
      }
      res[i] = row
    }
    console.log('[res]: ', res)

    // var res = new Array()
    // var currentRowIndex = 0
    // for (var i = 0; i < questions.length; i++) {
    //   console.log('[qtype]: ', questions[i].type)

    //   // 选择题
    //   if (questions[i].type == 'SCQ' || questions[i].type == 'MCQ') {
    //     res[currentRowIndex++] = [i.toString(), questions[i].content.description, ''] // 题号，题目描述
    //     const options = questions[i].content.options
    //     console.log('[options]: ', options)

    //     // 统计选择题结果
    //     var choice = new Array()
    //     for (var k = 0; k < options.length; k++) {
    //       choice[k] = 0 // 初始化
    //     }
    //     for (var j = 0; j < answers.length; j++) { // 遍历每份答案
    //       const temp = JSON.parse(answers[j].content)
    //       console.log('[temp]: ', temp)
    //       for (var k = 0; k < options.length; k++) { // 遍历每个选项
    //         console.log('[answer options]: ', temp[i].content.options)
    //         if (temp[i].content.options[k].isSelected == true) {
    //           choice[k]++;
    //         }
    //       }
    //     }
    //     console.log('[choice]: ', choice)

    //     for (var k = 0; k < options.length; k++) {
    //       res[currentRowIndex++] = ['(' + k + ')', options[k].name, choice[k].toString()] // 选项号，选项内容，选择次数
    //     }
    //     res[currentRowIndex++] = ['', '', ''] // 空行
    //   }
    //   // 简答题
    //   else if (questions[i].type = 'SAQ') {
    //     res[currentRowIndex++] = [i.toString(), questions[i].content.description, ''] // 题号，题目描述
    //     for (var j = 0; j < answers.length; j++) {
    //       const temp = JSON.parse(answers[j].content)
    //       console.log('[temp]: ', temp)
    //       res[currentRowIndex++] = ['', temp[i].content.answer, ''] // 空，回答
    //     }
    //     res[currentRowIndex++] = ['', '', ''] // 空行
    //   }
    // }
    // console.log('[res]: ', res)

    // 定义row的数据
    conf.rows = res
    // execute方法生成文件源数据
    const result = nodeExcel.execute(conf)
    // 将源数据转为
    const buffer = Buffer.from(result, 'binary')
    const data = await cloud.uploadFile({
      cloudPath: questionnaireName + '_' + event.qid + '.xlsx',
      fileContent: buffer
    })
    console.log('[return data]: ', data)
    if (data.statusCode != 200) {
      throw data.errMsg
    }
    console.log('[完成]: 完成获取问卷结果')
    return {
      success: true,
      fileID: data.fileID
    }
  } catch (err) {
    console.log('[错误]: ', err)
    return {
      success: false,
      error: err
    }
  }
}