import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

// Zod schema for user input validation
const userSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 5 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  age: z.number().min(18, { message: "Must be at least 18 years old" }).optional()
});

// Simulated database (replace with your actual database in production)
const users: Array<z.infer<typeof userSchema> & { id: number }> = [];

export const userRouter = router({
  // GET: Retrieve all users
  getUsers: publicProcedure
    .query(() => {
      return users;
    }),

  // GET: Retrieve a single user by ID
  getUserById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return users.find(user => user.id === input.id);
    }),

  // POST: Create a new user
  createUser: publicProcedure
    .input(userSchema)
    .mutation(({ input }) => {
      const newUser = {
        ...input,
        id: users.length + 1
      };

      users.push(newUser);
      return newUser;
    })
});