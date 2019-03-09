var mysql = require('mysql');

var weatherdao={
    sqlGetAll: "select * from weather;",
    // note that these methods are all the same except the sql and the data
    // in studentDAO2 we simplify that
    getAll:function(callback) {
        console.log("in dao " + weatherdao.sqlGetAll)
        var con = getConnection(); // we need a different connection for each
        con.connect(function (err) {
            if (err) throw err;
            var data = [];
            con.query(weatherdao.sqlGetAll,[] ,function (err, result) {
                handleErrorandLog(err,"getAll",result);
                if(callback)callback(result);
            });
        });
    },
    findById:function(id,callback){
        var con = getConnection();
        con.connect(function (err) {
            if (err) throw err;
            var data = [id];
            con.query(energydao.sqlFindById,data, function (err, result) {
                handleErrorandLog(err,"findById",result);
                if(callback)callback(result);
            });
        });
    },
    insert:function(Power,callback){
        var con = getConnection();
        con.connect(function (err) {
            if (err) throw err;
            var data = [Power.MPower , Power.Status];
            con.query(energydao.sqlInsert,data, function (err, result) {
                handleErrorandLog(err,"Insert",result);
                if(callback)callback(result);
            });
        });
    },
};

function getConnection(){
    return  mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'password',
        database:'p4db'
    });
}

function handleErrorandLog(err, name, result){
    if(err){
        console.log(err.sql);
        throw err;
    }
    console.log(name+": " + JSON.stringify(result));

}


module.exports= weatherdao;