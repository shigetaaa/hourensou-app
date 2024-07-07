import React from 'react';

export default function ApplicationLogo(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img src="/images/hourensou_logo.svg" alt="Application Logo" {...props} />
    );
}
