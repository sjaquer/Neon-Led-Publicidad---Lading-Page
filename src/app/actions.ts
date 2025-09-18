'use server';

import { z } from 'zod';

const formSchema = z.object({
  usageType: z.enum(['business', 'personal']),
  signType: z.string(),
  ideaDescription: z.string().optional(),
  imageAttachment: z.any().optional(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
});

export async function handleFormSubmission(data: z.infer<typeof formSchema>) {
  // This schema is now used for server-side validation only
  const b2bSchema = formSchema.extend({
    usageType: z.literal('business'),
  });

  const parsedData = b2bSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error('Invalid form data. Only business submissions are accepted.');
  }

  // In a real application, you would handle the data here:
  // - Save to a database
  // - Send an email notification
  // - Handle file uploads to a storage service (e.g., Firebase Storage)

  console.log('New B2B Quote Request Received:');
  console.log(parsedData.data);

  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true, message: 'Form submitted successfully!' };
}
