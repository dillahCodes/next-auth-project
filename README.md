# Next.js Authentication with Prisma & PostgreSQL  

## Description  
This is a **Next.js** project featuring authentication functionalities using **Prisma** as the ORM and **PostgreSQL** as the database.  

## Features  
- **User Registration:**  
  - Sign up with **email and password**  
  - Sign up with **GitHub**  
  - Sign up with **Google**  
- **User Login:**  
  - Login with **email and password**  
  - Login with **GitHub**  
  - Login with **Google**  
- **Password Reset:**  
  - Send a **password reset link** to the user's email  
- **Email Verification:**  
  - Send an **email verification link** for users registered with email and password  

## Installation  
```sh
# Clone the repository
git clone https://github.com/dillahCodes/next-auth-project.git
cd next-auth-project

# Install dependencies
pnpm install

# Set up environment variables
# Create a `.env` file and add the necessary configurations, including
# database credentials and authentication provider keys.

# generate prisma client
pnpm prisma generate

# Run the development server
pnpm run dev

# Open the project in your browser
# http://localhost:3000/
