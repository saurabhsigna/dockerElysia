import { eq } from "drizzle-orm";
import { db } from "../../db/db";
import { userSchema } from "../../db/schema";
import { httpError } from "../../helpers/HTTPError";
import { hashPassword } from "./password";

interface Props {
  id?: boolean | undefined;
  name?: boolean | undefined;
  email?: boolean | undefined;
  locations?: boolean | undefined;
  isVerified?: boolean | undefined;
  hashed_password?: boolean | undefined;
  createdAt?: boolean | undefined;
  profilePic?: boolean | undefined;
  session_key?: boolean | undefined;
  blocked_until?: boolean | undefined;
  isBlocked?: boolean | undefined;
  updatedAt?: boolean | undefined;
}

export class User {
  private user: any;

  constructor() {}

  async findUserByEmail(email: string, { ...props }: Props = { id: true }) {
    const user = await db.query.userSchema.findFirst({
      where: eq(userSchema.email, email),
      columns: {
        ...props,
      },
    });
    if (!user) {
      return null;
    } else {
      return user;
    }
  }

  async updateToVerified(email: string, set: any) {
    return new Promise(async (resolve: any, reject: any) => {
      await db
        .update(userSchema)
        .set({ isVerified: true })
        .where(eq(userSchema.email, email))
        .then((res) => {
          // reject(new httpError(500,"updated with reject but will remove after testing",set).promise())
          resolve("updated");
        })
        .catch((err) => {
          reject("some error");
        });
    });
  }

  async findUserById(userId: number, { ...props }: Props) {
    const user = await db.query.userSchema.findFirst({
      where: eq(userSchema.id, userId),
      columns: { ...props },
    });
    if (!user) {
      return null;
    } else {
      return user;
    }
  }

  async updatePassword(email: string, password: string) {
    return new Promise(async (resolve: any, reject: any) => {
      const hashed_password = await hashPassword(password);
      await db
        .update(userSchema)
        .set({ hashed_password })
        .where(eq(userSchema.email, email))
        .then((res) => {
          resolve("updated");
        })
        .catch((err) => {
          reject("some error in updating password");
        });
    });
  }
}
