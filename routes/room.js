const { query } = require('express');
var express = require('express');
var router = express.Router();
var dbConfig = require('../config/db');

//전체 방 리스트업
// router.get('/All', function(req, res){
//     let sort=req.query.sort;
//     let op =req.query.op;
    

//     if(op!=null){
//         if(sort=='asc'){
//             sort='where price2 order by price1 asc'
//         }else if(sort=='desc'){
//             sort='where price2 order by price1 desc'
//         }else if(sort=='rank'){
//             sort='INNER JOIN sum ON room.room_pk = sum.r_pk where price2 order by heart+comment+count DESC'
//         }else if(sort=='hits'){
//             sort='INNER JOIN sum ON room.room_pk = sum.r_pk where price2 order by count DESC'
//         }
//     }else{
//         if(sort=='asc'){
//             sort='order by price1 asc'
//         }else if(sort=='desc'){
//             sort='order by price1 desc'
//         }else if(sort=='rank'){
//             sort='INNER JOIN sum ON room.room_pk = sum.r_pk order by heart+comment+count DESC'
//         }else if(sort=='hits'){
//             sort='INNER JOIN sum ON room.room_pk = sum.r_pk order by count DESC'
//         }
//     }

//     dbConfig.connection.query('SELECT room_pk, roomName, location, price1, price2, deposit, latitude, longitude FROM room '+sort, [op],(err, rows) => {
//         if(err){
//             throw err;
//         }
//         res.send({"room": rows});
//     }); 
// });

//방
router.get('', function(req, res){
    let u_pk=req.get('u_pk');
    let category=req.query.category;
    let sort=req.query.sort;
    let op =req.query.op;
    let item='room_pk, roomName, location, price1, price2, deposit, latitude, longitude, category, heart, u_pk'
    
    if(category==0){
        if(op!=null){
            if(sort=='asc'){
                sort='and price2 order by price1 asc'
            }else if(sort=='desc'){
                sort='and price2 order by price1 desc'
            }else if(sort=='rank'){
                sort='and price2 order by heart+comment+count DESC'
            }else if(sort=='hits'){
                sort='and price2 order by count DESC'
            }
        }else{
            if(sort=='asc'){
                sort='order by price1 asc'
            }else if(sort=='desc'){
                sort='order by price1 desc'
            }else if(sort=='rank'){
                sort='order by heart+comment+count DESC'
            }else if(sort=='hits'){
                sort='order by count DESC'
            }
        }
    }
    else{
        if(op!=null){
            if(sort=='asc'){
                sort='and category=? and price2 order by price1 asc'
            }else if(sort=='desc'){
                sort='and category=? and price2 order by price1 desc'
            }else if(sort=='rank'){
                sort='and category=? and price2 order by heart+comment+count DESC'
            }else if(sort=='hits'){
                sort='and category=? and price2 order by count DESC'
            }
        }else{
            if(sort=='asc'){
                sort='and category=? order by price1 asc'
            }else if(sort=='desc'){
                sort='and category=? order by price1 desc'
            }else if(sort=='rank'){
                sort='and category=? order by heart+comment+count DESC'
            }else if(sort=='hits'){
                sort='and category=? order by count DESC'
            }
        }
    }
    console.log(u_pk)
    dbConfig.connection.query(`SELECT ${item} FROM project01.room INNER JOIN sum ON room.room_pk = sum.r_pk left JOIN heart ON room.room_pk = heart.r_pk where (u_pk=? or u_pk is NULL) ${sort}`, [u_pk,category], (err, rows)=>{
        if(err){
            throw err;
        }
        res.send({"room": rows});
    });
});

//방 이름으로 검색
router.get('/search',  function(req, res){
    const data={
        rN:req.query.rN
    }
    console.log(req.query.rN);
    let query=data.rN
    dbConfig.connection.query('SELECT room_pk, roomName, location, price1, price2, deposit, latitude, longitude, category FROM room WHERE roomName LIKE ?', '%' + query + '%',(err, rows) => {
        if(err){
            throw err;
        }
        res.send({"room": rows});
    });

    // dbConfig.connection.query('SELECT * FROM room where roomName=?',[data.rN],(err, rows) => {   //이름을 정확하게 입력해야만 작동
    //     if(err){
    //         throw err;
    //     }
    //     res.send(rows);
    // });
});

////***** 룸 라우터와 통합하여 폐기 */
//방별 하트 숫자 
// router.get('/heartCount',  function(req, res){
//     let r_pk=req.query.r_pk;
//     dbConfig.connection.query('SELECT r_pk, heart from project01.sum where r_pk=?;',
//     [r_pk],(err, rows) => {
//         if(err){
//             throw err;
//         }
//         if(rows[0]==null){
//             res.send("아무것도 없어요~~")
//         }else{
//             res.send({"room": rows});
//         }
//     });
// });
//유저 하트 라우터
// router.post('/heart',  function(req, res){
//     let u_pk=req.get('u_pk');
//     dbConfig.connection.query('SELECT r_pk, heart_check from project01.heart where u_pk=?;',[u_pk],(err, rows) => {
//         if(err){
//             throw err;
//         }
//         if(rows[0]==null){
//             res.send("하트누른게 없어요~~")
//         }else{
//             console.log(u_pk)
//             res.send({"room": rows});
//         }
//     });
// });

//댓글창
router.get('/commentView',  function(req, res){
    let r_pk = req.query.r_pk;
    dbConfig.connection.query('SELECT r_pk, star, comment, date FROM project01.comment WHERE r_pk=?',[r_pk],(err, rows) => {
        if(err){
            throw err;
        }
        console.log(rows);
        res.send({"room": rows});
    });
});
router.post('/comment', function(req,res){
    let r_pk = req.body.r_pk;
    let u_pk = req.body.u_pk;
    let star = req.body.star;
    let comment = req.body.comment;
    dbConfig.connection.query('insert into comment (r_pk,u_pk,star,comment) VALUES(?,?,?,?);',[r_pk,u_pk,star,comment],(err, rows) => {
        if(err){
            throw err;
        }
        console.log(rows);
        res.send({"room": rows});
    });
});

//조회수 카운팅라우터
router.post('/count', function(req,res){
    let r_pk = req.get('r_pk');
    
    dbConfig.connection.query('UPDATE project01.sum SET count=count+1 where r_pk=?;',[r_pk],(err,rows) =>{
        if(err){
            throw err;
        }
        res.send("완료");
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////


//방 정렬 price1(년세)오름차순(낮은가격순)
router.get('/sortP',  function(req, res){
    dbConfig.connection.query('SELECT roomName, location, price1, price2, deposit FROM room order by price1 asc',(err, rows) => {
        if(err){
            throw err;
        }
        res.send(rows);
    });
});
//방 정렬 price1(년세)내림차순(높은가격순)
router.get('/sortPD',  function(req, res){
    dbConfig.connection.query('SELECT roomName, location, price1, price2, deposit FROM room order by price1 DESC',(err, rows) => {
        if(err){
            throw err;
        }
        res.send(rows);
    });
});

//방정렬 랭킹순 (heart + comment + count ->높은순) 
router.get('/sortR', function(req, res){
    dbConfig.connection.query('SELECT roomName, location, price1, price2, deposit FROM room INNER JOIN sum ON room.room_pk = sum.r_pk order by heart+comment+count DESC;', (err, rows)=>{
        if(err){
            throw err;
        }
        res.send(rows);
    });
});

//방정렬 조회수순
router.get('/sortC', function(req, res){
    dbConfig.connection.query('SELECT roomName, location, price1, price2, deposit FROM room INNER JOIN sum ON room.room_pk = sum.r_pk order by count DESC;', (err, rows)=>{
        if(err){
            throw err;
        }
        res.send(rows);
    });
});

//옵션 반년세 있는 방만 보여주기
router.get('/sortP2', function(req, res){
    dbConfig.connection.query('SELECT roomName, location, price1, price2, deposit FROM room where price2', (err, rows)=>{
        if(err){
            throw err;
        }
        res.send(rows);
    });
});



module.exports = router;