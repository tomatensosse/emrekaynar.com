# User Management Scripts

This directory contains scripts for managing users in the database.

## Add User Script

The `add-user.ts` script allows you to interactively create or update a user in the database.

### How to Run

```bash
# Navigate to the project root
cd your-project-directory

# Run the script
npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/add-user.ts
```

### What the Script Does

1. Asks for a username
2. Asks for a password (which will be hashed)
3. Optionally asks for an auto-redirect path (where to send the user after login)
4. Creates the user if they don't exist, or updates them if they do
5. Confirms that the user exists in the database

### Example Usage

```
$ npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/add-user.ts
Enter username: baneva
Enter password: blend
Enter auto redirect path (optional, press Enter to skip): /music/album/clv-lp
User "baneva" successfully created!
User exists in database and can be used for login.

User creation process completed.
```

After creating a user, you should be able to log in with the provided credentials.