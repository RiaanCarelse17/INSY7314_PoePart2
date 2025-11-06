const bcrypt = require('bcryptjs');
const db = require('./firebase');

(async () => {
  const hashedPassword = await bcrypt.hash("AdminStrongPassword123!", 10);

  await db.ref('users/admin1').set({
    fullName: "System Admin",
    idNumber: "0000000000000",
    accountNumber: "ADMIN-001",
    password: hashedPassword,
    role: "admin",
    balance: 0
  });

  console.log("✅ Admin user created");
  process.exit();
})();
