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
  const parsedData = formSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error('Invalid form data.');
  }

  // In a real application, you would handle the data here:
  // - Save to a database
  // - Send an email notification
  // - Handle file uploads to a storage service (e.g., Firebase Storage)

  console.log('New Quote Request Received:');
  console.log(parsedData.data);

  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true, message: 'Form submitted successfully!' };
}
