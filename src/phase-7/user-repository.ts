import { eq } from 'drizzle-orm';
import { db } from './db';
import { users } from './schema';

export const createUser = async (name: string, email: string) => {
  const response = await db
    .insert(users)
    .values({ name, email })
    .returning({ id: users.id, name: users.name, email: users.email });

  return response[0];
};

export const getUserById = async (userId: number) => {
  const user = await db.select().from(users).where(eq(users.id, userId));
  return user[0];
};

export const getAllUsers = async () => {
  const allUsers = await db.select().from(users);
  return allUsers;
};

export const deleteUser = async (userId: number) => {
  const user = await db
    .delete(users)
    .where(eq(users.id, userId))
    .returning({ id: users.id, name: users.name, email: users.email });

  return user[0];
};
