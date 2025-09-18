'use server';

/**
 * @fileOverview An AI agent for optimizing landing page content with SEO keywords.
 *
 * - optimizeSeoKeywords - A function that suggests SEO keywords for given content.
 * - OptimizeSeoKeywordsInput - The input type for the optimizeSeoKeywords function.
 * - OptimizeSeoKeywordsOutput - The return type for the optimizeSeoKeywords function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeSeoKeywordsInputSchema = z.object({
  content: z.string().describe('The landing page content to optimize.'),
  focusKeyword: z.string().optional().describe('Optional focus keyword to include in the optimized keywords.')
});
export type OptimizeSeoKeywordsInput = z.infer<typeof OptimizeSeoKeywordsInputSchema>;

const OptimizeSeoKeywordsOutputSchema = z.object({
  keywords: z.array(z.string()).describe('An array of SEO keywords optimized for the content.'),
  metaDescription: z.string().describe('Suggested meta description to use in the HTML <meta> tag.'),
});
export type OptimizeSeoKeywordsOutput = z.infer<typeof OptimizeSeoKeywordsOutputSchema>;

export async function optimizeSeoKeywords(input: OptimizeSeoKeywordsInput): Promise<OptimizeSeoKeywordsOutput> {
  return optimizeSeoKeywordsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeSeoKeywordsPrompt',
  input: {schema: OptimizeSeoKeywordsInputSchema},
  output: {schema: OptimizeSeoKeywordsOutputSchema},
  prompt: `You are an SEO expert. Given the following landing page content, suggest a list of highly relevant SEO keywords. Always include the optional focus keyword if provided by the user.

Content: {{{content}}}

Focus Keyword: {{{focusKeyword}}}

Ensure that you only return the keywords as array. Also, generate one suggested meta description for this page, of maximum 160 characters. The meta description should contain some of the keywords you generated for this page.

Keywords:`, // Ensure keywords are returned as an array.
});

const optimizeSeoKeywordsFlow = ai.defineFlow(
  {
    name: 'optimizeSeoKeywordsFlow',
    inputSchema: OptimizeSeoKeywordsInputSchema,
    outputSchema: OptimizeSeoKeywordsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
