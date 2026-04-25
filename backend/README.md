# 🌾 KrishiRakshak – Backend API

**Real-Time Pest and Disease Alert System for Farmers**

A beginner-friendly Node.js + Express.js + MongoDB backend.

---

## 📁 Folder Structure

```
backend/
│
├── models/
│   ├── User.js          ← Farmer user schema (with bcrypt password)
│   └── Disease.js       ← Disease/pest data schema
│
├── routes/
│   ├── authRoutes.js    ← /api/auth/register and /api/auth/login
│   └── detectRoutes.js  ← /api/detect and /api/diseases/:cropName
│
├── controllers/
│   ├── authController.js   ← Registration and login logic
│   └── detectController.js ← Tag-matching detection algorithm
│
├── middleware/
│   ├── authMiddleware.js   ← JWT token verification
│   └── upload.js           ← Multer image upload config
│
├── data/
│   └── seedData.js      ← Dataset with 70+ diseases, run once to seed DB
│
├── uploads/             ← Saved crop images (auto-created)
├── server.js            ← App entry point
├── .env                 ← Environment variables (never commit this!)
└── package.json
```

---

## 🚀 How to Run

### Step 1 – Install dependencies
```bash
cd backend
npm install
```

### Step 2 – Start MongoDB
Make sure MongoDB is installed and running:
```bash
# On Linux/Mac:
mongod --dbpath /data/db

# Or if using MongoDB as a service:
sudo systemctl start mongod
```

### Step 3 – Seed the database
Run this ONCE to insert all disease data:
```bash
npm run seed
# or:
node data/seedData.js
```

You should see:
```
✅ Connected to MongoDB
🗑️  Cleared existing data
✅ Inserted 74 disease records
📊 Seeded dataset summary:
   wheat      → 13 diseases
   rice       → 12 diseases
   potato     → 11 diseases
   maize      → 10 diseases
   cotton     → 10 diseases
   tomato     → 10 diseases
   onion      →  8 diseases
```

### Step 4 – Start the server
```bash
npm start
# or for auto-restart during development:
npm run dev
```

You should see:
```
✅ MongoDB connected successfully!
🚀 Server running on http://localhost:5000
```

---

## 📋 API Endpoints

### Auth

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "name":     "Ramesh Kumar",
  "email":    "ramesh@farmer.in",
  "password": "farmer123",
  "phone":    "9876543210",
  "village":  "Khanna, Punjab",
  "crop":     "wheat"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email":    "ramesh@farmer.in",
  "password": "farmer123"
}
```

Both return a JWT token you can use for protected routes.

---

### Detection

#### Detect Disease
```
POST /api/detect
Content-Type: multipart/form-data

cropName: wheat
tag:      yellow spots, powdery
image:    [crop photo file]
```

**Response:**
```json
{
  "success": true,
  "cropName": "wheat",
  "tagUsed": "yellow spots, powdery",
  "imagePath": "/uploads/crop-1703123456.jpg",
  "isFallback": false,
  "message": "Found 1 matching disease(s)",
  "results": [
    {
      "diseaseName": "Yellow Rust (Stripe Rust)",
      "description": "A fungal disease caused by Puccinia striiformis...",
      "symptoms": "Yellow or orange powdery stripes along leaf veins...",
      "treatment": "Spray Propiconazole 25% EC @ 0.1%...",
      "prevention": "Plant resistant varieties like HD-2967...",
      "severity": "High",
      "tags": ["yellow spots", "yellow stripes", "powdery yellow", "rust"],
      "matched": true
    }
  ]
}
```

#### Browse Diseases by Crop
```
GET /api/diseases/wheat
GET /api/diseases/rice
GET /api/diseases/potato
```

---

## 🔍 Detection Logic Explained

```
User sends: cropName="wheat", tag="yellow spots, dry leaves"

Step 1: Split tag into keywords
        ["yellow spots", "dry leaves"]

Step 2: Find all wheat diseases in MongoDB
        → returns 13 wheat diseases

Step 3: For each disease, check if ANY keyword
        appears in the disease's tags array
        
        Disease "Yellow Rust" has tags:
        ["yellow spots", "yellow stripes", "powdery yellow", "rust"]
        
        "yellow spots" ∈ disease tags?  ✅ YES → MATCH!

Step 4: Return matched diseases

Step 5: If no match found → return 2 fallback diseases
        with matched: false
```

---

## 🧪 Testing with Postman

### Test Registration
- Method: POST
- URL: `http://localhost:5000/api/auth/register`
- Body: raw JSON → (see register body above)

### Test Login
- Method: POST
- URL: `http://localhost:5000/api/auth/login`
- Body: raw JSON → (see login body above)

### Test Detection
- Method: POST
- URL: `http://localhost:5000/api/detect`
- Body: **form-data** (not JSON!)
  - `cropName` → Text → `wheat`
  - `tag` → Text → `yellow spots`
  - `image` → File → (select any image)

### Browse Diseases
- Method: GET
- URL: `http://localhost:5000/api/diseases/wheat`

---

## 📦 Dependencies Used

| Package | Purpose |
|---------|---------|
| `express` | Web framework for Node.js |
| `mongoose` | MongoDB object modeling |
| `multer` | Handle image file uploads |
| `bcrypt` | Hash passwords securely |
| `jsonwebtoken` | Create and verify JWT tokens |
| `dotenv` | Load .env environment variables |
| `cors` | Allow frontend to call backend API |
| `nodemon` | Auto-restart server on file changes (dev only) |

---

## ⚠️ Common Issues

**MongoDB not connecting?**
```bash
# Start MongoDB:
sudo systemctl start mongod
# Or:
mongod --dbpath /data/db
```

**Port 5000 already in use?**
```bash
# Change PORT in .env:
PORT=3001
```

**Image not uploading?**
- Make sure Content-Type is `multipart/form-data` in Postman
- Field name must be exactly `image` (matches multer config)

---

## 💡 Technology Stack
- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB ORM
- **Multer** – File upload handler
- **bcrypt** – Password hashing
- **JWT** – Authentication tokens
- **dotenv** – Environment configuration
