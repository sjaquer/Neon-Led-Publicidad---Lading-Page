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
        'relative flex items-center justify-center mb-4',
        className
      )}
    >
      <motion.div
        className="absolute left-0 bottom-0 h-0.5 bg-primary w-1/4"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={lineVariants}
        style={{ originX: 0 }}
      />
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={textVariants}
      >
        <Component className="font-headline">{children}</Component>
      </motion.div>
      <motion.div
        className="absolute right-0 top-0 h-0.5 bg-primary w-1/4"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={lineVariants}
        style={{ originX: 1 }}
      />
    </div>
  );
}
