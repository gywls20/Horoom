<<<<<<< HEAD
const mysql = require('mysql');

const dbInfo = {
    host     : 'localhost',
    port     : '3308',
    user     : 'root',
    password : 'Hoseo12345^',
    database : 'project01',
    socketPath:'/run/mysqld/mysqld.sock'
};

const connection = mysql.createPool(dbInfo);
//connection.connect();

function login(ID,PW){
    return new Promise((res, rej) => {
        connection.query(`SELECT user_pk FROM user where id=? and pw=?`,[ID,PW], (err, rows) => {
            if(err){
                rej(err);
            } else{
                if(rows[0]==null){
                    res(0)
                }
                else{
                    res({"result": rows[0]})
                }
            }
        });
    })
}

function join(ID,PW){
    return new Promise((res, rej) => {
        connection.query('SELECT * FROM user WHERE id = ?', [ID], function(error, results) { // DB에 같은 이름의 회원아이디가 있는지 확인
            if(error){
                rej(error);
            }
            if (results.length <= 0){ //DB에 같은 이름의 회원아이디가 없다
                //DB저장
                connection.query('insert into user (id, pw) VALUES(?,?)',[ID,PW], (err, rows) => {
                    if(err){
                        rej(err);}
                    res(1);
                });
            }
            else{
                res(0);
            }
        });
    })
}



module.exports = {
    connection,
    login,
    join
};
=======
const mysql = require('mysql');

const dbInfo = {
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : '0000',
    database : 'project01'
};

const connection = mysql.createPool(dbInfo);
//connection.connect();

function login(ID,PW){
    return new Promise((res, rej) => {
        connection.query(`SELECT user_pk FROM user where id=? and pw=?`,[ID,PW], (err, rows) => {
            if(err){
                rej(err);
            } else{
                if(rows[0]==null){
                    res(0)
                }
                else{
                    res({"result": rows[0]})
                }
            }
        });
    })
}

function join(ID,PW){
    return new Promise((res, rej) => {
        connection.query('SELECT * FROM user WHERE id = ?', [ID], function(error, results) { // DB에 같은 이름의 회원아이디가 있는지 확인
            if(error){
                rej(error);
            }
            if (results.length <= 0){ //DB에 같은 이름의 회원아이디가 없다
                //DB저장
                connection.query('insert into user (id, pw) VALUES(?,?)',[ID,PW], (err, rows) => {
                    if(err){
                        rej(err);}
                    res(1);
                });
            }
            else{
                res(0);
            }
        });
    })
}



module.exports = {
    connection,
    login,
    join
};
>>>>>>> e6340e3fdb0fce4ae8e3723f8fd8581c72994159
