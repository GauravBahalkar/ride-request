import type { SignupInput } from "./auth.types.js";
import type { LoginInput } from "./auth.types.js";
import { db } from "../../index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { users } from "../../db/schema/users.schema.js";

////signup logic

export const signupService = async (data: SignupInput) => {
  try {
    // 👉 here you will later connect DB (Drizzle/Prisma)

    //1. check user is exist or not through email
    //2. if exist then throw error else hash the  provided password usong bcrypt.hash
    //3. AFTER password hash store it in database once it stored in db then get the newly created uid and create jwt token and release response
    const { name, email, password, role } = data;
    //   Check if user already exists

    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Insert user into DB

    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
        role,
      })
      .returning();

    //  Generate JWT token
    const token = jwt.sign(
      { userId: newUser!.id, role: newUser!.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      },
    );

    // Return response
    return {
      user: newUser,
      token,
    };
  } catch (error: any) {
    throw new Error(error.message || "Signup failed");
  }
};

///// login logic

export const loginService = async (data: LoginInput) => {
  try {
    const { email, password } = data;

    //  Check user exists (email)
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      throw new Error("Invalid email or password");
    }

    //  Compare password (bcrypt.compare)

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invali email or password");
    }
    // 3. Generate JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      },
    );

    // 4. Return safe user + token
    const { password: _, ...safeUser } = user;

    //  Return response
    return {
      user: safeUser,
      token,
    };
  } catch (error: any) {
    throw new Error(error.message || "Login failed");
  }
};

export const getProfileService = async (userId: number) => {
  try {
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        mobileNo: users.mobileNo,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch profile");
  }
};
