const express = require("express");
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z4biwgz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const medicineCollection = client
      .db("medicinesDb")
      .collection("myMedicine");
    const usersCollection = client.db("medicinesDb").collection("users");
    const cartsCollection = client.db("medicinesDb").collection("carts");
    const advertisementCollection = client
      .db("medicinesDb")
      .collection("advertise");
    const paymentCollection = client.db("medicinesDb").collection("payments");
    const ordersCollection = client.db("medicinesDb").collection("orders");

    // JWT Token Generation
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    // JWT Middleware
    const verifyToken = (req, res, next) => {
      const authHeader = req.headers.authorization;
      if (!authHeader)
        return res.status(401).send({ message: "Unauthorized access" });
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err)
          return res.status(401).send({ message: "Unauthorized access" });
        req.decoded = decoded;
        next();
      });
    };

    // Verify Admin Middleware
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const user = await usersCollection.findOne({ email });
      if (user?.role !== "admin")
        return res.status(403).send({ message: "Forbidden access" });
      next();
    };

    app.get("/advertise", async (req, res) => {
      const result = await advertisementCollection.find().toArray();
      res.send(result);
    });

    // USERS API
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const users = await usersCollection.find().toArray();
      res.send(users);
    });

    app.get("/user/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const user = await usersCollection.findOne({ email });

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.send({ role: user.role });
    });

    app.patch("/user/role/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const { role } = req.body;
      const validRoles = ["admin", "seller", "user"];
      if (!validRoles.includes(role))
        return res.status(400).send({ message: "Invalid role" });
      const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { role } }
      );
      res.send(result);
    });

    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    });
    app.post("/users", async (req, res) => {
      const user = req.body;
      const existingUser = await usersCollection.findOne({ email: user.email });
      if (existingUser)
        return res.send({ message: "User already exists", insertedId: null });
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // MEDICINES API
    app.get("/myMedicine", async (req, res) => {
      const medicines = await medicineCollection.find().toArray();
      res.send(medicines);
    });

    // app.post("/myMedicine", async (req, res) => {
    //   const medicineData = req.body;
    //   const result = await medicineCollection.insertOne(medicineData);
    //   res.send(result);
    // });
    app.post("/myMedicine", async (req, res) => {
      try {
        const medicineData = req.body;
        // sellerEmail অবশ্যই থাকতে হবে
        if (!medicineData.sellerEmail) {
          return res.status(400).send({ error: "Seller email is required" });
        }
        const result = await medicineCollection.insertOne(medicineData);
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to add medicine" });
      }
    });

    app.get("/myMedicineUp", async (req, res) => {
      const { search = "", sort = "" } = req.query;
      const query = { name: { $regex: search, $options: "i" } };

      let sortOption = {};
      if (sort === "price") {
        sortOption = { price: 1 };
      } else if (sort === "name") {
        sortOption = { name: 1 };
      }
      const medicines = await medicineCollection
        .find(query)
        .sort(sortOption)
        .toArray();
      res.send(medicines);
    });

    app.patch("/myMedicine/:id", async (req, res) => {
      const id = req.params.id;
      const update = req.body;
      const result = await medicineCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: update }
      );
      res.send(result);
    });

    app.delete("/myMedicine/:id", async (req, res) => {
      const id = req.params.id;
      const result = await medicineCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // CART API
    app.post("/carts", async (req, res) => {
      const result = await cartsCollection.insertOne(req.body);
      res.send(result);
    });

    app.get("/carts", async (req, res) => {
      const carts = await cartsCollection.find().toArray();
      res.send(carts);
    });

    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const result = await cartsCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.patch("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const { quantity } = req.body;
      const result = await cartsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { quantity } }
      );
      res.send(result);
    });

    // Seller apis
    app.get("/seller-stats", async (req, res) => {
      const email = req.query.email;

      // এখানে পেমেন্ট কালেকশন ব্যবহার করো
      const payments = await paymentCollection
        .find({ sellerEmail: email })
        .toArray();

      // যদি sellerEmail এখনো না পাঠাও, তাহলে buyerEmail দিয়েও চেক করতে পারো
      // const payments = await paymentCollection.find({ buyerEmail: email }).toArray();

      const totalRevenue = payments.reduce((sum, p) => sum + (p.price || 0), 0);
      const totalPaid = payments
        .filter((p) => p.status === "paid")
        .reduce((sum, p) => sum + (p.price || 0), 0);
      const totalPending = totalRevenue - totalPaid;

      res.send({
        revenue: totalRevenue,
        totalPaid,
        totalPending,
      });
    });

    // PAYMENT API
    app.post("/create-payment-intent", async (req, res) => {
      try {
        const { price } = req.body;
        if (!price || isNaN(price))
          return res.status(400).json({ error: "Invalid price" });
        const amount = Math.round(Number(price) * 100);
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: "usd",
          payment_method_types: ["card"],
        });
        res.json({ clientSecret: paymentIntent.client_secret });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
      }
    });

    app.post("/payments", async (req, res) => {
      const payment = req.body;
      const paymentResult = await paymentCollection.insertOne(payment);
      const query = {
        _id: { $in: payment.cartIds.map((id) => new ObjectId(id)) },
      };
      const deleteResult = await cartsCollection.deleteMany(query);
      res.send({ paymentResult, deleteResult });
    });

    app.get("/payments/:email", async (req, res) => {
      const payments = await paymentCollection
        .find({ buyerEmail: req.params.email })
        .toArray();
      res.send(payments);
    });
    app.get("/inv-payments/:email", async (req, res) => {
      const email = req.params.email;
      const payments = await paymentCollection
        .find({ buyerEmail: email })
        .toArray();
      res.send(payments);
    });
    app.get("/payment-history", async (req, res) => {
      const email = req.query.email;

      try {
        const payments = await paymentCollection.find({ email }).toArray();
        res.send(payments);
      } catch (error) {
        res.status(500).send({ message: "Server error", error });
      }
    });
    // Get payment history by sellerEmail or buyerEmail
    app.get("/payments", async (req, res) => {
      const sellerEmail = req.query.sellerEmail;
      let query = {};
      if (sellerEmail) {
        query = { email: sellerEmail }; // এখানে field নাম adjust করো
      }
      const result = await paymentCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      if (typeof price !== "number" || price <= 0) {
        return res.status(400).send({ error: "Invalid price value" });
      }
      const amount = Math.round(price * 100);
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: "usd",
          payment_method_types: ["card"],
        });
        res.send({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        res.status(500).send({ error: "Payment processing failed" });
      }
    });

    // ✅ Delete a payment by ID
    app.delete("/payments/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await paymentCollection.deleteOne(query);
      res.send(result);
    });

    // ✅ Update payment status (for example: approve/reject)
    app.patch("/payments/:id", async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: updatedData,
      };
      const result = await paymentCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    app.get("/advertisements", verifyToken, async (req, res) => {
      const email = req.query.sellerEmail;
      const query = email ? { sellerEmail: email } : {};
      const result = await advertisementCollection.find(query).toArray();
      res.send(result);
    });
    app.post("/advertisements", verifyToken, async (req, res) => {
      const adData = req.body;
      const result = await advertisementCollection.insertOne(adData);
      res.send(result);
    });

    console.log("Connected to MongoDB successfully!");
  } finally {
    // You can close client if needed
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Medicines project is running");
});

app.listen(port, () => {
  console.log(`Medicines project is running on port ${port}`);
});
