import { tv } from 'tailwind-variants';

export const testBox = tv({
    base: 'h-[200px] w-[600px] flex bg-blue-500 gap-[12px]',
    variants: {
        backgroundColor: {
            red: 'bg-red-500',
            green: 'bg-green-500',
        },
    },
    defaultVariants: {
        backgroundColor: 'green',
    },
});
