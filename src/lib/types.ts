export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  clientImage: string;
  companyLogo?: string;
  type: 'business' | 'personal';
};
