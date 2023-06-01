<<<<<<< HEAD
var express = require('express');
var router = express.Router();
var dbConfig = require('../config/db');



//로그인 요청 라우터
router.post('/', async (req, res) =>{
    const data={
        userId:req.body.userId,
        userPassword:req.body.userPassword
    }
    const result={

    }
    console.log("로그인연결");
    let login_check = await dbConfig.login(data.userId,data.userPassword);
    if(login_check == 0){
        console.log("실패")
        res.send({"result":false});
    }
    else{
        console.log("성공")
        res.send(login_check);
    }
});

//dmlkfanlkfnlkrnlkgnl
//회원가입 요청 라우터
router.post('/join', async (req, res) =>{
    const data={
        userId:req.body.userId,
        userPassword:req.body.userPassword
    }
    let join_check= await dbConfig.join(data.userId,data.userPassword);
    if(join_check==1){
        res.send({"result":true});
    }else if(join_check==0){
        res.send({"result":false});
    }
});

router.get('/check',  function(req, res){
    let ID=req.get('ID');
    console.log("확인")
    dbConfig.connection.query('SELECT * FROM user WHERE id = ?;',[ID],(err, rows) => {
        if(err){
            throw err;
        }else if (rows.length <= 0){ //DB에 같은 이름의 회원아이디가 없다
            res.send({"result":true});
        }
        else{
            res.send({"result":false});
        }
    });
});

=======
var express = require('express');
var router = express.Router();
var dbConfig = require('../config/db');



//로그인 요청 라우터
router.post('/', async (req, res) =>{
    const data={
        userId:req.body.userId,
        userPassword:req.body.userPassword
    }
    const result={

    }
    console.log("로그인연결");
    let login_check = await dbConfig.login(data.userId,data.userPassword);
    if(login_check == 0){
        console.log("실패")
        res.send("로그인 실패");
    }
    else{
        console.log("성공")
        res.send(login_check);
    }
});

//dmlkfanlkfnlkrnlkgnl
//회원가입 요청 라우터
router.post('/join', async (req, res) =>{
    const data={
        userId:req.body.userId,
        userPassword:req.body.userPassword
    }
    let join_check= await dbConfig.join(data.userId,data.userPassword);
    if(join_check==1){
        res.send("회원가입 성공");
    }else if(join_check==0){
        res.send("회원가입 실패: 같은 아이디");
    }
});

>>>>>>> e6340e3fdb0fce4ae8e3723f8fd8581c72994159
module.exports = router;