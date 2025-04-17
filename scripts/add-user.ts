import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import readline from 'readline';

const prisma = new PrismaClient();

// Create interface for readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promisify the question method
function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  try {
    // Get username
    const username = await question('Enter username: ');
    if (!username) {
      console.error('Username cannot be empty');
      return;
    }

    // Get password
    const password = await question('Enter password: ');
    if (!password) {
      console.error('Password cannot be empty');
      return;
    }

    // Get auto redirect path (optional)
    const autoRedirect = await question('Enter auto redirect path (optional, press Enter to skip): ');
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create the user
    const user = await prisma.user.upsert({
      where: { username },
      update: {
        password: hashedPassword,
        autoRedirect: autoRedirect || null
      },
      create: {
        username,
        password: hashedPassword,
        autoRedirect: autoRedirect || null
      }
    });
    
    console.log(`User "${user.username}" successfully ${user.createdAt === user.updatedAt ? 'created' : 'updated'}!`);
    
    // Check if user exists in database to confirm
    const checkUser = await prisma.user.findUnique({
      where: { username }
    });
    
    if (checkUser) {
      console.log('User exists in database and can be used for login.');
    } else {
      console.log('WARNING: Could not verify user in database after creation!');
    }
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});

// Handle readline close
rl.on('close', () => {
  console.log('\nUser creation process completed.');
  process.exit(0);
});