
function adminPanel(req,res,obj){
    console.log("Admin Panel");
    const {tableName,queryType,filterColumn,filterValue,setColumn,setvalue,connection} = obj
    console.log( tableName, queryType, filterColumn, typeof(filterValue), setColumn, setvalue)
    if(isNaN(tableName)){
        console.log(tableName)
        if(queryType === "select"){
            if(filterColumn !== undefined && filterValue !== null){
                connection.query('select * from '+tableName+" where "+filterColumn+" = ?",[filterValue],(err,result,fields) => {
                    if(err){
                        res.send(err)
                        res.end()
                    }else{
                        console.log(result)
                        res.send(result)
                    }
                }) 
            }else{
                connection.query('select * from '+tableName,(err,result,fields) => {
                    if(err){
                        res.send(err)
                    }else{
                        res.send(result)
                    }
                }) 
            }
        }
        else if(queryType === "delete" ){
            if(filterColumn !== undefined && filterValue !== null)
                connection.query('delete from '+tableName+" where "+filterColumn+"=?",[filterValue],(err,result,fields) => {
                    if(err){
                        res.send(err)
                        res.end()
                    }else{
                        res.send(result)
                    }
                })
            else 
                connection.query('delete from '+tableName,(err,result,fields) => {
                    if(err){
                        res.send(err)
                        res.end()
                    }else{
                        res.send(result)
                    }
                })
        }
        else if(queryType === "update" && filterColumn !== undefined &&  setColumn !== undefined  && setvalue !== undefined ){
            connection.query('update '+tableName+" set "+setColumn+"= ? where "+filterColumn+"= ?",[setvalue, filterValue],(err,result,fields) => {
                if(err){
                    res.send(err)
                    res.end()
                }else{
                    res.send(result)
                }
            })
        }
        else if(queryType === "insert" && filterColumn !== ""){
            connection.query('update '+tableName+" set "+filterColumn+" where ?",[filterValue],(err,result,fields) => {
                if(err){
                    res.send(err)
                    res.end()
                }else{
                    res.send(result)
                }
            })
        }
        else{
            res.send("Invalid command")
        }
    }else{
        connection.query('show tables',(err,result,fields) => {
            if(err){
                res.send(err)
                res.end()
            }else{
                res.send(result)
            }
        })
    }
}
module.exports = adminPanel