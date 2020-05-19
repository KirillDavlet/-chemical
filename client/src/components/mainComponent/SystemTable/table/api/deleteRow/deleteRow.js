import api from "./../api"

/**
 * СЕРВЕРНЫЙ КОД
 *
 *    app.del('/removeFromTable', function (req,res) {
 *            console.log(req.query)
 *            //УДАЛЯЕМ СТРОКУ ИЗ БД
 *            res.send('asdasd')
 *    });
 *
 *
 */

export default {
  deleteFile (data) {
    return api().delete('/removeFromTable',{params:{tableName:data.tableName,id:data.id}})
  }
}
