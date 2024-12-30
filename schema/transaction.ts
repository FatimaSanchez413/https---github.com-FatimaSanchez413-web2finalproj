
import { date, z } from 'zod'

export const CreateTransactionSchema = z.object({
    amount:z.coerce.number().positive().multipleOf(0.01),
    description: z.string().optional(),
    date: date(),
    category: z.string(),
    type: z.union([z.literal("Earnings"), z.literal("Expense")]),
});


export type CreateTransactionSchemaType = z.infer<typeof CreateTransactionSchema>;
