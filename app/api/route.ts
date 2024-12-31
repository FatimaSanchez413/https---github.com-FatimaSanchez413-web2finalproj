/* eslint-disable @typescript-eslint/no-unused-vars */

import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
    const user = await currentUser();

    if(!user) {
        return Response.redirect("/sign-in", 302);
    }

    let userSettings = await prisma.userSettings.findUnique({
        where: {
            userId: user.id
        },
    });

    if(!userSettings) {
        userSettings = await prisma.userSettings.create({
            data: {
                userId: user.id,
                currency: "PHP",
            }
    });
    }

    revalidatePath("/");
    return Response.json(userSettings);
}