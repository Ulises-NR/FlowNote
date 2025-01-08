import { connectionToDatabase } from "@/utils/dbConnection";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  try {
    await connectionToDatabase();

    const userExists = await User.findOne({
      email,
    });
    if (userExists)
      return Response.json(
        { status: 400, message: "Email is already in use" },
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    return Response.json(
      {
        status: 201,
        message: "User saved successfully",
      },
      {
        status: 201,
      }
    );
  } catch (e: any) {
    return Response.json({ status: 500, error: e.message }, { status: 500 });
  }
}
