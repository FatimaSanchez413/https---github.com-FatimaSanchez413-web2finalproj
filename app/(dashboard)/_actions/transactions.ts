"use server";

import prisma from "@/lib/prisma";
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schema/transaction";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateTransaction(form: 
    CreateTransactionSchemaType) {
  const parsedBody = CreateTransactionSchema.safeParse(form);

  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }

  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const {
    amount,
    category,
    date,
    description,
    type
  } = parsedBody.data;

  const categoryRow = await prisma.category.findFirst({
    where: {
      name: category,
      userId: user.id
    },
  });
  

  if(!categoryRow){
    throw new Error("Invalid category");
  }


await prisma.$transaction([
    prisma.transaction.create({
        data:{
            userId: user.id,
            amount,
            date,
            description: description || "",
            type,
            category: category,
            categoryIcon: categoryRow.icon
        },
    }),


    ///
    prisma.monthHistory.upsert({
        where:{
            day_month_year_userId:{
                userId:user.id,
                day: date.getUTCDate(),
                month: date.getUTCMonth(),
                year: date.getUTCFullYear(),
        },
    },
    create:{
        userId: user.id,
        day: date.getUTCDate(),
        month: date.getUTCMonth(),
        year: date.getUTCFullYear(),
        Expense: type === "Expense" ? amount : 0,
        Earnings: type === "Earnings" ? amount : 0,
    },
    update:{
        Expense: {
            increment: type === "Expense" ? amount : 0,
        },
        Earnings: {
            increment: type === "Earnings" ? amount : 0,
        },
    },
    }),

    ///
    prisma.yearHistory.upsert({
        where:{
            month_year_userId:{
                userId:user.id,
                month: date.getUTCMonth(),
                year: date.getUTCFullYear(),
        },
    },
    create:{
        userId: user.id,
        month: date.getUTCMonth(),
        year: date.getUTCFullYear(),
        Expense: type === "Expense" ? amount : 0,
        Earnings: type === "Earnings" ? amount : 0,
    },
    update:{
        Expense: {
            increment: type === "Expense" ? amount : 0,
        },
        Earnings: {
            increment: type === "Earnings" ? amount : 0,
        },
    },
    })
])
}