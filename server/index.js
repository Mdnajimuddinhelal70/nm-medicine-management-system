const express = require("express");
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
<<<<<<< HEAD
const port = process.env.PORT || 5000;

//middlewares
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://b9-a12-project.web.app",
//       "https://b9-a12-project.firebaseapp.com",
//     ],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { default: Stripe } = require("stripe");
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9b7hvrr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z4biwgz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
=======
const port = process.env.PORT || 8001;

//middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://b9-a12-project.web.app",
      "https://b9-a12-project.firebaseapp.com",
    ],
    credentials: true,
  })
);
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9b7hvrr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

>>>>>>> 1b25aa50ef1b94e02cce0c085eecdb5ccdf81d8f
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
<<<<<<< HEAD

=======
>>>>>>> 1b25aa50ef1b94e02cce0c085eecdb5ccdf81d8f
    const usersCollection = client.db("medicinesDb").collection("users");
    const cartsCollection = client.db("medicinesDb").collection("carts");
    const paymentCollection = client.db("medicinesDb").collection("payments");
    const advertisementCollection = client
      .db("medicinesDb")
      .collection("advertisements");

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
      if (!authHeader) {
        return res.status(401).send({ message: "Unauthorized access" });
      }
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Unauthorized access" });
        }
        req.decoded = decoded;
        next();
      });
    };

    // Verify Admin Middleware
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      if (user?.role !== "admin") {
        return res.status(403).send({ message: "Forbidden access" });
      }
      next();
    };

    // Users Related APIs
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const users = await usersCollection.find().toArray();
      res.send(users);
    });

    // API to check if a user is an admin
    app.get("/users/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "Unauthorized access" });
      }
      const user = await usersCollection.findOne({ email });
      const isAdmin = user?.role === "admin";
      res.send({ admin: isAdmin });
    });

    // Generic API to update user role
    app.patch("/users/role/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const { role } = req.body;
      const validRoles = ["admin", "seller", "user"];
      if (!validRoles.includes(role)) {
        return res.status(400).send({ message: "Invalid role" });
      }
      const filter = { _id: new ObjectId(id) };
      const updateDoc = { $set: { role } };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "User already exists", insertedId: null });
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const result = await usersCollection.findOne({ email });
      res.send(result);
    });

    // Medicines Related APIs
    app.get("/myMedicine", async (req, res) => {
      const medicines = await medicineCollection.find().toArray();
      res.send(medicines);
<<<<<<< HEAD
      // console.log(medicines);
=======
>>>>>>> 1b25aa50ef1b94e02cce0c085eecdb5ccdf81d8f
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

    //post data to the serer
    app.post("/myMedicine", async (req, res) => {
      const medicineData = req.body;
      console.log("Received data:", medicineData);
      const result = await medicineCollection.insertOne(medicineData);
      console.log(result);
      res.status(200).json({ message: "Medicine added successfully!" });
    });

    // Carts Related APIs
    app.post("/carts", async (req, res) => {
      const cartItem = req.body;
      const result = await cartsCollection.insertOne(cartItem);
      res.send(result);
    });

    app.get("/carts", async (req, res) => {
      const carts = await cartsCollection.find().toArray();
      res.send(carts);
    });

    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartsCollection.deleteOne(query);
      res.send(result);
    });

    app.patch("/carts/:id", async (req, res) => {
      const id = req.params.id;
      const { quantity } = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = { $set: { quantity: quantity } };
      const result = await cartsCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    // Payment Related APIs
<<<<<<< HEAD
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("Missing STRIPE_SECRET_KEY in .env");
      process.exit(1);
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    app.post("/create-payment-intent", async (req, res) => {
      try {
        const { price } = req.body; // expect number (e.g., 12.5)
        if (!price || isNaN(price)) {
          return res.status(400).json({ error: "Invalid price" });
        }
        const amount = Math.round(Number(price) * 100); // cents
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: "usd",
          payment_method_types: ["card"],
        });
        return res.json({ clientSecret: paymentIntent.client_secret });
      } catch (err) {
        console.error("create-payment-intent error:", err);
        return res.status(500).json({ error: "Server error" });
=======
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
>>>>>>> 1b25aa50ef1b94e02cce0c085eecdb5ccdf81d8f
      }
    });

    app.post("/payments", async (req, res) => {
      const payment = req.body;
      const paymentResult = await paymentCollection.insertOne(payment);
      const query = {
        _id: {
          $in: payment.cartIds.map((id) => new ObjectId(id)),
        },
      };
      const deleteResult = await cartsCollection.deleteMany(query);
      res.send({ paymentResult, deleteResult });
    });

    app.get("/payments/:email", async (req, res) => {
      const query = { email: req.params.email };
      const payments = await paymentCollection.find(query).toArray();
      res.send(payments);
    });

    // Get all payments (admin route)
    app.get("/payments", async (req, res) => {
      const result = await paymentCollection.find().toArray();
      res.send(result);
    });

    // show data to the manage history for seller
    app.get("/payments", async (req, res) => {
      const result = await paymentCollection.find().toArray();
      res.send(result);
    });

    // Update payment status to "paid"
    app.patch("/payments/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const updateDoc = { $set: { status: "paid" } };
      const filter = { _id: new ObjectId(id) };
      const result = await paymentCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
    // api for payment history in dashboard
    app.get("/seller-payment-history", async (req, res) => {
      const { email } = req.query;
      const paymentHistory = await paymentCollection
        .find({ sellerEmail: email })
        .toArray();
      res.send(paymentHistory);
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
      const payments = await paymentCollection
        .find({ buyerEmail: email })
        .toArray();
      const paidTotal = payments
        .filter((payment) => payment.status === "paid")
        .reduce((sum, payment) => sum + payment.price, 0);
      const pendingTotal = payments
        .filter((payment) => payment.status === "pending")
        .reduce((sum, payment) => sum + payment.price, 0);
      res.send({
        paymentHistory: payments,
        paidTotal,
        pendingTotal,
      });
    });

    //for delete payment
    app.delete("/payments/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await paymentCollection.deleteOne(query);
      res.send(result);
    });

    // Add a new category
    app.post("/myMedicine", async (req, res) => {
      const category = req.body;
      const result = await medicineCollection.insertOne(category);
      res.send(result);
    });

    // Update a category
    app.patch("/myMedicine/:id", async (req, res) => {
      const id = req.params.id;
      const category = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = { $set: category };
      const result = await medicineCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // Delete a category
    app.delete("/myMedicine/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await medicineCollection.deleteOne(filter);
      res.send(result);
    });

    //api for advertisment for seller
    app.post("/advertisements", async (req, res) => {
      const { sellerEmail, medicineImage, description, status } = req.body;
      const advertisementData = {
        sellerEmail,
        medicineImage,
        description,
        status: status || "Not In Use",
      };
      const result = await advertisementCollection.insertOne(advertisementData);
      res.send(result);
    });

    app.get("/advertisements", async (req, res) => {
      const sellerEmail = req.query.sellerEmail;
      const advertisements = await advertisementCollection
        .find({ sellerEmail })
        .toArray();
      res.send(advertisements);
    });

    // GET all advertisements
    app.get("/advertise", async (req, res) => {
      const result = await advertisementCollection.find().toArray();
      res.send(result);
    });

    // POST new advertisement
    app.post("/advertise", async (req, res) => {
      const advertise = req.body;
      advertise.addedToSlider = false;
      const result = await advertisementCollection.insertOne(advertise);
      res.send(result);
    });

    // PATCH to toggle add/remove from slider
    app.patch("/advertise/:id", async (req, res) => {
      const id = req.params.id;
      const { addedToSlider } = req.body;
      const result = await advertisementCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { addedToSlider } }
      );
      res.send(result);
    });

    //Stats for admin dashboard
    app.get("/admin-stats", async (req, res) => {
      try {
        const users = await usersCollection.estimatedDocumentCount();
        const medicineItems = await medicineCollection.estimatedDocumentCount();
        const orders = await paymentCollection.estimatedDocumentCount();

        // Calculate total revenue from paid orders
        const revenueResult = await paymentCollection
          .aggregate([
            {
              $match: { status: "paid" },
            },
            {
              $group: {
                _id: null,
                totalRevenue: {
                  $sum: { $toDouble: { $ifNull: ["$price", "0"] } },
                },
              },
            },
          ])
          .toArray();
        const revenue =
          revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

        const paidTotalResult = await paymentCollection
          .aggregate([
            {
              $match: { status: "paid" },
            },
            {
              $group: {
                _id: null,
                totalPaid: {
                  $sum: { $toDouble: { $ifNull: ["$price", "0"] } },
                },
              },
            },
          ])
          .toArray();
        const totalPaid =
          paidTotalResult.length > 0 ? paidTotalResult[0].totalPaid : 0;

        const pendingTotalResult = await paymentCollection
          .aggregate([
            {
              $match: { status: "pending" },
            },
            {
              $group: {
                _id: null,
                totalPending: {
                  $sum: { $toDouble: { $ifNull: ["$price", "0"] } },
                },
              },
            },
          ])
          .toArray();
        const totalPending =
          pendingTotalResult.length > 0
            ? pendingTotalResult[0].totalPending
            : 0;

        res.send({
          users,
          medicineItems,
          orders,
          revenue,
          totalPaid,
          totalPending,
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).send({ error: "Failed to fetch admin stats" });
      }
    });

    app.get("/seller-stats", async (req, res) => {
      try {
        const users = await usersCollection.estimatedDocumentCount();
        const medicineItems = await medicineCollection.estimatedDocumentCount();
        const orders = await paymentCollection.estimatedDocumentCount();

        const revenueResult = await paymentCollection
          .aggregate([
            {
              $match: { status: "paid" },
            },
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: { $toDouble: "$price" } },
              },
            },
          ])
          .toArray();
        const revenue =
          revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;
        const paidTotalResult = await paymentCollection
          .aggregate([
            {
              $match: { status: "paid" },
            },
            {
              $group: {
                _id: null,
                totalPaid: { $sum: { $toDouble: "$price" } },
              },
            },
          ])
          .toArray();
        const totalPaid =
          paidTotalResult.length > 0 ? paidTotalResult[0].totalPaid : 0;
        const pendingTotalResult = await paymentCollection
          .aggregate([
            {
              $match: { status: "pending" },
            },
            {
              $group: {
                _id: null,
                totalPending: { $sum: { $toDouble: "$price" } },
              },
            },
          ])
          .toArray();
        const totalPending =
          pendingTotalResult.length > 0
            ? pendingTotalResult[0].totalPending
            : 0;

        res.send({
          users,
          medicineItems,
          orders,
          revenue,
          totalPaid,
          totalPending,
        });
      } catch (err) {
        console.error(err);
        res
          .status(500)
          .send({ error: "An error occurred while fetching admin stats" });
      }
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Medicines project is running");
});

app.listen(port, () => {
  console.log(`Medicines project is running on port ${port}`);
});
