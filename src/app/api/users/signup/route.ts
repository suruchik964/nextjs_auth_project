import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/user_model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/src/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { username, email, password } = reqBody;
    // Here you should add all the checks that if username is provided or not and same for other two , even if it done in models

    //check if user exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    //save the user in db
    const savedUser = await newUser.save();
    console.log(savedUser);

    //send verification email

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    console.log("sent email");

    return NextResponse.json({
      message: "User created succesfully",
      succes: true,
      savedUser,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// post , get , put etc make separate funtcion for eact task
