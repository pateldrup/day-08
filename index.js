const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://pateldrupcg:Drup123@portfoliodata.hhp0yo4.mongodb.net/?appName=portfoliodata')
    .then(() => console.log("Connect with MongoDB"))
    .catch(err => console.log("Coudn't connect with MongoDB"))

app.get("/", (req, res) => {
    res.send("Server is Running");
});

const bioData = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const getData = mongoose.model('UserDetails', bioData);

app.post("/addData", async (req, res) => {
    try {
        const user = await getData.create(req.body);
        res.status(200).json(user);
    }
    catch (err) {
        return res.status(404).json({ message: "Data not Added" });
    }
});

app.get("/getData", async (req, res) => {
    try {
        const getUser = await getData.find();
        res.status(200).json(getUser);
    }
    catch {
        return res.status(404).json({ message: "Data not Found" });
    }
});

app.put("/updateData/:id",async(req,res)=>{
    const userId = req.params.id;
    try{
        const updateData = await getData.findByIdAndUpdate(userId,req.body,{returnDocument:"after"});
        res.status(200).json(updateData);
    }
    catch{
        return res.status(404).json({message :"Data not updated"});
    }
});

app.delete("/deleteData/:id",async(req,res)=>{
    const userId = req.params.id;
    try{
        const dataDelete = await getData.findByIdAndDelete(userId,req.body);
        res.status(200).json(dataDelete);
    }
    catch{
        return res.status(404).json({message :"Data not Deleted"});
    }
});

app.listen(5001, () => {
    console.log("server is ruuning on PORT 5001");
}); 