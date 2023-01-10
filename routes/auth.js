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

module.exports = router;