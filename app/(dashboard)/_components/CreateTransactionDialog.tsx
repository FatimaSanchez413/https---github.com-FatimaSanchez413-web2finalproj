"use client";

import {  DialogContent, DialogTitle, Dialog, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schema/transaction";
import { ReactNode } from "react";

interface Props{
    trigger: ReactNode;
    type: TransactionType;
}

import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input"; // Adjust the import path based on your project structure
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";

function CreateTransactionDialog({trigger, type}: Props) {
    const form = useForm<CreateTransactionSchemaType>
({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
        type,
        date: new Date(),
    },
})
  return (
  <Dialog>
    <DialogTrigger asChild>
        {trigger}
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>
                Create New{"   "}
                <span className={cn(
                    "m-1",
            type === "Earnings" ? "text-emerald-500":
            "text-red-500")}>
                {type}
            </span>
            {"   "}Transaction
            </DialogTitle>
        </DialogHeader>
        <Form {...form}>
            <form className="space-y-4">
                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Description
                            </FormLabel>
                            <FormControl>
                                <Input defaultValue={""} {...field} />
                            </FormControl>
                            <FormDescription>
                                Transaction description (optional)
                            </FormDescription>
                        </FormItem>
                    )}
                    />


                    <FormField
                    control={form.control}
                    name="amount"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Amount
                            </FormLabel>
                            <FormControl>
                                <Input defaultValue={0} type="number"{...field} />
                            </FormControl>
                            <FormDescription>
                                Transaction Amount (required)
                            </FormDescription>
                        </FormItem>
                      )}
                    />
                    


            </form>
        </Form>
    </DialogContent>
  </Dialog>
  )
}

export default CreateTransactionDialog