"use server";
import { clerkClient } from "@clerk/nextjs/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
// import { createUser, deleteUser, updateUser } from "@/lib/actions/users.action";
// import { handleError } from "@/lib/utils";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new NextResponse("Error occurred", {
      status: 400,
    });
  }
  const { id } = evt.data;
  const eventType = evt.type;

  // CREATE
  if (eventType === "user.created") {
    const { id, email_addresses, image_url, first_name, last_name, username } =
      evt.data;

    // const user: CreateUserParams = {
    //   clerkId: id,
    //   email: email_addresses[0].email_address,
    //   username: JSON.stringify(username),
    //   firstName: JSON.stringify(first_name),
    //   lastName: JSON.stringify(last_name),
    //   photo: image_url,
    // };

    try {
      //   const newUser = await createUser(user);
      //   if (newUser) {
      //     await clerkClient.users.updateUserMetadata(id, {
      //       publicMetadata: {
      //         userId: newUser.id,
      //       },
      //     });
      //   }
      console.log(
        id,
        email_addresses,
        image_url,
        first_name,
        last_name,
        username
      );

      return NextResponse.json({ message: "OK" });
    } catch (error) {
      console.error("Error creating user:", error);
      return new NextResponse("Error creating user", {
        status: 500,
      });
    }
  }
  // UPDATE
  //   if (eventType === "user.updated") {
  //     try {
  //       const { email_addresses, image_url, first_name, last_name, username } =
  //         evt.data;

  //       const user = {
  //         email: email_addresses[0].email_address,
  //         firstName: first_name!,
  //         lastName: last_name!,
  //         username: username!,
  //         photo: image_url!,
  //       };

  //       const updatedUser = await updateUser(user);

  //       return NextResponse.json({ message: "OK", user: updatedUser });
  //     } catch (error) {
  //       handleError(error);
  //     }
  //   }

  //   if (eventType === "user.deleted") {
  //     try {
  //       const deletedUser = await deleteUser(id!);

  //       return NextResponse.json({ message: "OK", user: deletedUser });
  //     } catch (error) {
  //       handleError(error);
  //     }
  //   }

  return new Response("", { status: 200 });
}
