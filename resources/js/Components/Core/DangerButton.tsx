import { ButtonHTMLAttributes } from 'react';

export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `btn btn-outline btn-error hover:text-white active:text-white ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
