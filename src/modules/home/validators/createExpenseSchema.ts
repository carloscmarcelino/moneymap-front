import { z } from 'zod';

import { INVALID_FORMAT } from '@/config';

export const createExpenseSchema = z.object({
  amount: z.string().refine((val) => val !== '', { message: INVALID_FORMAT }),
  description: z.string().refine((val) => val !== '', { message: INVALID_FORMAT }),
  paymentMethod: z.string().refine((val) => val !== '', { message: INVALID_FORMAT }),
});

export type CreateExpenseType = z.infer<typeof createExpenseSchema>;
