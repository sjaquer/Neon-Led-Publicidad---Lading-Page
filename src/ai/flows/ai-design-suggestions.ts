'use server';

/**
 * @fileOverview An AI-powered design suggestion flow for neon LED designs.
 *
 * - aiDesignSuggestions - A function that takes business details, product information, and desired mood as input and suggests tailored neon LED design elements, layouts, color schemes, and relevant SEO keywords.
 * - AiDesignSuggestionsInput - The input type for the aiDesignSuggestions function.
 * - AiDesignSuggestionsOutput - The return type for the aiDesignSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiDesignSuggestionsInputSchema = z.object({
  businessDetails: z.string().describe('Details about the business, such as industry and target audience.'),
  productInformation: z.string().describe('Information about the product or service being offered.'),
  desiredMood: z.string().describe('The desired mood or atmosphere for the space.'),
});
export type AiDesignSuggestionsInput = z.infer<typeof AiDesignSuggestionsInputSchema>;

const AiDesignSuggestionsOutputSchema = z.object({
  designElements: z.string().describe('Suggested neon LED design elements.'),
  layoutSuggestions: z.string().describe('Suggestions for the layout of the neon LED design.'),
  colorSchemeSuggestions: z.string().describe('Suggested color schemes for the neon LED design.'),
  seoKeywords: z.string().describe('Relevant SEO keywords to help visualize potential applications.'),
});
export type AiDesignSuggestionsOutput = z.infer<typeof AiDesignSuggestionsOutputSchema>;

export async function aiDesignSuggestions(input: AiDesignSuggestionsInput): Promise<AiDesignSuggestionsOutput> {
  return aiDesignSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiDesignSuggestionsPrompt',
  input: {schema: AiDesignSuggestionsInputSchema},
  output: {schema: AiDesignSuggestionsOutputSchema},
  prompt: `You are an AI assistant specializing in neon LED design. A user will provide details about their business, product, and desired mood for their space. Based on this information, suggest tailored neon LED design elements, layouts, color schemes, and relevant SEO keywords.

Business Details: {{{businessDetails}}}
Product Information: {{{productInformation}}}
Desired Mood: {{{desiredMood}}}

Provide the suggestions in a clear and concise manner.

Design Elements: 
Layout Suggestions: 
Color Scheme Suggestions: 
SEO Keywords: `,
});

const aiDesignSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiDesignSuggestionsFlow',
    inputSchema: AiDesignSuggestionsInputSchema,
    outputSchema: AiDesignSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
