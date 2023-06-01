var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Horoom' });
});

// // 이미지 처리
// router.get('/image', function(req, res, err){ 
//   //let r_pk =req.query.r_pk;
//   let r_pk=req.get('r_pk');
//   //let r_pk ='준.png';
//   if(err){
//     res.send({"result":false})
//   }else{
//     res.redirect('/image/' + r_pk +'.png');
//   }
  
// });

//커뮤니티 가이드라인
router.get('/guide', function(req, res, next) {
  res.render('guide', { title: 'Express' });
});
//개인정보동의
router.get('/Personal_information', function(req, res, next) {
  res.render('Personal_information', { title: 'Express' });
});

module.exports = router;
