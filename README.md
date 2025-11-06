Project by

Riaan Carelse ST10065550
Jared Allen ST10271869
Abigail Finnis ST10045251

Youtube link: https://youtu.be/5BOnPDxAhjk

Overview
SecurePay is a full-stack web application built for our university project to demonstrate secure customer authentication, payment processing, and DevSecOps best practices. This includes HTTPS encryption, input validation, password hashing, and automated CI/CD pipelines.

Users can:

Sign up with secure credentials

Log in with hashed password verification

Make payments in South African Rands (ZAR)

View immediate feedback and error handling

🛠️ Technologies Used
Frontend: React (with modular components and custom navigation)

Backend: Express (Node.js) with Firebase Realtime Database

Security:

HTTPS with self-signed certificates

Helmet for secure headers

Bcrypt for password hashing and salting

Regex-based input validation

Rate limiting with express-rate-limit

Firebase for secure online data storage

GitHub Actions pipeline for linting, testing, and auditing

CircleCI integration


🚀 How to Run Locally
1. Clone the Repository
bash
git clone https://github.com/your-username/INSY7314_PoePart2.git
cd securepay
2. Install Dependencies
bash
cd backend
npm install

cd ../client
npm install
3. Generate SSL Certificates
Place your cert.pem and key.pem files inside server/certs/. You can generate them using:

bash
openssl req -nodes -new -x509 -keyout key.pem -out cert.pem
4. Start the Backend
bash
cd server
node server.js
The backend runs on https://localhost:443

5. Start the Frontend
bash
cd frontend
npm start
The frontend runs on http://localhost:3000 and proxies requests to the secure backend.

🔐 Security Highlights
Helmet: Adds secure headers to all responses

Rate Limiting: Prevents brute-force login attempts

Bcrypt: Hashes and salts passwords before storing

Regex Validation: Blocks injection attacks on all input fields

HTTPS: Encrypts all data in transit using SSL

🧪 DevSecOps Pipeline
GitHub Actions runs on every push:

npm run lint

npm test

npm audit

Optional CircleCI config included in .circleci/config.yml

📄 Documentation



Demo video included 


