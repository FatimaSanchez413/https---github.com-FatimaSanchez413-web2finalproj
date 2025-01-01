"use client";

import {  DialogContent, DialogTitle, Dialog, DialogHeader, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schema/transaction";
import { ReactNode, useCallback } from "react";

interface Props{
    trigger: ReactNode;
    type: TransactionType;
}

import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input"; // Adjust the import path based on your project structure
import CategoryPicker from "@/app/(dashboard)/_components/CategoryPicker";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

function CreateTransactionDialog({trigger, type}: Props) {
    const form = useForm<CreateTransactionSchemaType>
({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
        type,
        date: new Date(),
    },
})


const handleCategoryChange = useCallback(
    (value: string) => {
    form.setValue("category", value);
}, 
[form]);

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
                    
                    
                    <div className="flex items-center justify-between
                    gap-2">
                        <FormField
                    control={form.control}
                    name="category"
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Category
                            </FormLabel>
                            <FormControl>
                                <CategoryPicker type={type} onChange={
                                    handleCategoryChange
                                }/>
                            </FormControl>
                            <FormDescription>
                                Select a catergory transaction.
                            </FormDescription>
                        </FormItem>
                      )}
                    /> 
                    


                    <FormField
                    control={form.control}
                    name="date"
                     
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Transaction date
                            </FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[200px] pl-3 text-left font-normal", 
                                            !field.value && "text-muted-foreground"
                                        )}>
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span> Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4
                                            opacity-50"/>

                                    

                                        </Button>
                                    </FormControl>

                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                            <Calendar 
                                            mode="single" 
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            initialFocus
                                            />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                Select a date.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                      )}
                    /> 
                    
                    
                    
                    </div>

            </form>
        </Form>

        <DialogFooter>
        <DialogClose asChild>
            <Button
            type="button"
            variant={"secondary"}
            onClick={() => {
                form.reset();
            }}
            >
                Cancel
            </Button>
        </DialogClose>
        <Button onClick={form.handleSubmit(onSubmit)}
        disabled = {isPending}>
            {!isPending && "Create"}
            {isPending && <Loader2 className='animate-spin' />}
        </Button>
    </DialogFooter> 
    
    </DialogContent>
  </Dialog>
  )
}

export default CreateTransactionDialog