const express = require("express"),
      router  = express.Router();

const axios = require('axios');


router.get('/', (req, res) => {
    res.redirect('/home');
});

router.get('/home', (req, res) => {
    res.render("home");
});


router.post('/start-service', async(req, res) => {
    let loanId = req.body.loanId;
    await axios.post('http://localhost:4455/Start-Process', {},
    {
        params: {
            loanId: loanId
        }
    }
    )
    .then(response => {
        let data = response.data;
        let name = data.name;

        if(name === "IR Pending"){
            res.render("ir-pending", {data});
        }
        else if(name === "IR InProgress"){
            res.render("ir-inprogress", {data});
        }
        else if(name === "IR Hold"){
            res.render("ir-hold", {data});
        }
        else if(name === "IR Completed"){
            res.render("ir-completed", {data});
        }
        else{
            res.render("thankyou", {text: "unknown state returned"});
        }
    })
    .catch(err => {
        console.log("error while startig camunda");
        res.render("thankyou", {text: "Something wrong happened"});
    });
});



router.post('/change-state', async(req, res) => {
    let enquiry = "";
    let hold = false;
    if(req.body.enquiry){
        enquiry = req.body.enquiry;
    }
    if(req.body.hold){
        hold = true;
    }
    await axios.post('http://localhost:4455/Complete-Task', {
        id: req.body.id,
        name: req.body.name,
        loanId: req.body.loanId,
        variables: {
            onHold: {"value": hold}
        },
        otherData: {
            enquiry: enquiry
        }
    })
    .then(response => {
        let data = response.data;


        if(data === "Process Completed"){
            return res.render("thankyou", {text: "Process Completed"});
        }

        let name = data.name;

        if(name === "IR Pending"){
            res.render("ir-pending", {data});
        }
        else if(name === "IR InProgress"){
            res.render("ir-inprogress", {data});
        }
        else if(name === "IR Hold"){
            res.render("ir-hold", {data});
        }
        else if(name === "IR Completed"){
            res.render("ir-completed", {data});
        }
        else{
            res.render("thankyou", {text: "unknown state returned"});
        }
    })
    .catch(err => {
        console.log("Error in sending the satte change request");
        let text = {title: "Something wrong happened"};
        res.render("thankyou", {text});
    });
});





module.exports = router;