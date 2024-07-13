

import React from 'react';

interface ApplicationLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
}

export default function ApplicationLogo({ className = '', ...props }: ApplicationLogoProps) {
    return (
        <img
            // src="/images/hourensou_logo.svg"
            alt="ほうれんそうロゴ"
            className={className}
            {...props}
        />
    );
}
