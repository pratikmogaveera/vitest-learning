import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, queryClient } from './db';
import { createUser, deleteUser, getAllUsers, getUserById } from './user-repository';

beforeAll(async () => {
  await migrate(db, { migrationsFolder: './src/phase-7/migrations' });
});

beforeEach(async () => {
  await db.execute('TRUNCATE TABLE users');
});

afterAll(async () => {
  await queryClient.end();
});

describe('Testing User Repository', () => {
  it('checks creating a user', async () => {
    const response = await createUser('Mock User', 'user@mock.com');
    expect(response).toMatchObject({ name: 'Mock User', email: 'user@mock.com' });
  });

  it('checks getting a user by userId', async () => {
    const created = await createUser('Mock User', 'user@mock.com');
    const response = await getUserById(created.id);
    expect(response).toMatchObject({ id: created.id });
  });

  it('checks getting all users', async () => {
    await createUser('Mock User', 'user@mock.com');
    await createUser('Mock User', 'user2@mock.com');
    await createUser('Mock User', 'user3@mock.com');
    const response = await getAllUsers();
    expect(response).toHaveLength(3);
  });

  it('checks deleting a user returns the user', async () => {
    const created = await createUser('Mock User', 'user@mock.com');
    const response = await deleteUser(created.id);
    expect(response).toMatchObject({ id: created.id });
  });

  it('checks getting a deleted user returns undefined', async () => {
    const created = await createUser('Mock User', 'user@mock.com');
    const deleted = await deleteUser(created.id);

    const response = await getUserById(deleted.id);
    expect(response).toBeUndefined();
  });
});
