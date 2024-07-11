const express = require('express');
const cors = require('cors')
require('./db/config');
const User = require('./db/User');
const Products = require('./db/Products')
const app = express();
app.use(cors());
app.use(express.json());
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com'

app.post("/signup", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {
        if (err) {
            resp.send({ result: "something went wrong" });
        }
        else {
            resp.send({ result, token: token });
        }
    })
    

});
app.post("/login", async (req, resp) => {
    if (req.body.email && req.body.password) {
        let customer = await User.findOne(req.body).select("-password");
        if (customer) {
            Jwt.sign({ customer }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    resp.send({ result: "something went wrong" });
                }
                else {
                    resp.send({ customer, token: token });
                }
            })

        }

        else {
            resp.send({ result: "No user found" });
        }
    }
    else {
        resp.send({ result: "No user found" });
    }
});
app.post("/add-products", async (req, resp) => {
    let product = new Products(req.body);
    let result = await product.save();
    resp.send(result);
});
app.get("/products", async (req, resp) => {
    let list = await Products.find();
    if (list.length > 0) {
        resp.send(list);
    }
    else {
        resp.send("No result found");
    }

});
app.delete('/product/:id', async (req, resp) => {
    const result = await Products.deleteOne({ _id: req.params.id });
    resp.send(result);
});
app.get('/updateproduct/:id', async (req, resp) => {
    let result = await Products.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.send("No result found");
    }

});
app.put('/Update-product/:id', async (req, resp) => {
    let result = await Products.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    );
    resp.send(result);
});
app.get("/search/:key", async (req, resp) => {
    let result = await Products.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { model: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }

        ]
    });
    resp.send(result);
});

app.listen(5000);