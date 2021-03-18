const express = require("express"),
      router  = express.Router();


router.get('/', (req, res) => {
    res.redirect('/loans/inprogress');
});

router.get('/loans/inprogress', (req, res) => {
    res.render("inprogress");
});

router.post('/loans/inprogress', (req, res) => {
    console.log(req.body);
    res.send("Message Has been sent");
});

router.get('/loans/hold', (req, res) => {
    res.render("hold");
});

router.post('/loans/hold', (req, res) => {
    console.log("Released");
    res.send("released");
});




module.exports = router;