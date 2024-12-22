db = db.getSiblingDB("admin");

db.createUser({
  user: "admin",
  pwd: "password123",
  roles: [{ role: "root", db: "admin" }]
});

print("Admin user created successfully.");