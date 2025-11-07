# SecurePay

## Project by
- Riaan Carelse ST10065550  
- Jared Allen ST10271869  
- Abigail Finnis ST10045251  

 Demo Video:  
Youtube link: https://youtu.be/ZJo-6fOrDfs

*** Please note AI was used in the duration of this project for error handling and help with Layout***
# https://claude.ai/share/8f81e3fb-aba5-461a-be25-a005ad2cf482 

Note: In the demo video, funds were mistakenly transferred to the same account for demonstration purposes.  
The application fully supports sending money to any other valid account that exists in the database. Even though our source code in our .zip folder says "PoePart2" our part 3 work is in there. Thanks for understanding!

** Admin login data is pre-created as registration for this role is not possible 
	Username: admin1
	Password: AdminStrongPassword123!

##  Overview
**SecurePay** is a full-stack web application built for our university project to demonstrate secure customer authentication, payment processing, and DevSecOps best practices.  

This includes HTTPS encryption, input validation, password hashing, and automated CI/CD pipelines with **SonarCloud quality gates** to enforce code security and maintainability.

### Users can:
- Sign up with secure credentials  
- Log in with hashed password verification  
- Make payments in South African Rands (ZAR)  
- View immediate feedback and error handling  

---

## Technologies Used

**Frontend**
- React (modular components, custom navigation)

**Backend**
- Express (Node.js) with Firebase Realtime Database

**Security**
- HTTPS with self-signed certificates  
- Helmet for secure headers  
- Bcrypt for password hashing and salting  
- Regex-based input validation  
- Rate limiting with `express-rate-limit`  
- Firebase for secure online data storage  

**DevSecOps**
- GitHub Actions pipeline for linting, testing, and auditing  
- CircleCI pipeline with:
  - Dependency installation
  - SonarCloud static analysis
  - **Quality Gate enforcement** (pipeline fails if critical issues are found)  
- SonarCloud integration for:
  - Code smells, bugs, and vulnerabilities
  - Enforced quality gates
  - CI/CD feedback loop  

---

##  How to Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/INSY7314_POE_FINAL.git

2.cd server
  npm install

  cd ../client
  npm install

3.Generate SSL Certificates: 
  openssl req -nodes -new -x509 -keyout key.pem -out cert.pem

4. Start the backend
   cd server
   node server.js

5. Start the frontend
   cd client
   npm start

## Security Highlights

-Helmet: Adds secure headers to all responses

-Rate Limiting: Prevents brute-force login attempts

-Bcrypt: Hashes and salts passwords before storing

-Regex Validation: Blocks injection attacks on all input fields

-HTTPS: Encrypts all data in transit using SSL/TLS

-SonarCloud Quality Gates: Prevents insecure or low-quality code from merging

##DevSecOps Pipeline
GitHub Actions
Runs on every push:

-npm run lint

-npm test

-npm audit

CircleCI
-Build job: Installs dependencies and prepares the project

-SonarCloud job: Runs static analysis with enforced quality gates

-Workflow: Ensures code is only accepted if it passes both build and security checks

##Documentation

-Demo video included for academic review

-CI/CD config in .circleci/config.yml

-Security and DevSecOps practices documented inline
   
