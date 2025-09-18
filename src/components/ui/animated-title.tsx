'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ElementType } from 'react';
import { cn } from '@/lib/utils';

type AnimatedTitleProps = {
  as?: ElementType;
  children: React.ReactNode;
  className?: string;
};

export function AnimatedTitle({
  as: Component = 'h1',
  children,
  className,
}: AnimatedTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex items-center justify-center mb-4 w-full overflow-hidden',
        className
      )}
    >
      <motion.div
        className="h-0.5 bg-primary flex-grow"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={lineVariants}
        style={{ originX: 1 }}
      />
      <motion.div
        className="px-4"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={textVariants}
      >
        <Component className="font-headline whitespace-nowrap">{children}</Component>
      </motion.div>
      <motion.div
        className="h-0.5 bg-primary flex-grow"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={lineVariants}
        style={{ originX: 0 }}
      />
    </div>
  );
}
