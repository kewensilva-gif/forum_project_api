import { User as PrimeUser} from "generated/prisma";

export class User implements PrimeUser {
  name: string | null;
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}