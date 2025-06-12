const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

async function createAdminUser() {
  try {
    console.log("Creating admin user...")

    // Check if admin user already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: "admin@fitnessfest.com" },
    })

    if (existingAdmin) {
      console.log("Admin user already exists!")
      console.log("Email:", existingAdmin.email)
      console.log("Role:", existingAdmin.role)
      console.log("Has password:", !!existingAdmin.password)

      // Update password if needed
      const hashedPassword = await bcrypt.hash("admin123", 10)
      await prisma.user.update({
        where: { email: "admin@fitnessfest.com" },
        data: { password: hashedPassword },
      })
      console.log("Password updated!")
      return
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("admin123", 10)
    console.log("Password hashed successfully")

    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        email: "admin@fitnessfest.com",
        name: "Admin User",
        role: "admin",
        password: hashedPassword,
      },
    })

    console.log("Admin user created successfully!")
    console.log("Email: admin@fitnessfest.com")
    console.log("Password: admin123")
    console.log("User ID:", adminUser.id)
    console.log("Role:", adminUser.role)
  } catch (error) {
    console.error("Error creating admin user:", error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminUser()
