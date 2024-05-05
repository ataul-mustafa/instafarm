import React from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import Style from './BackButton.module.css';
import Link from 'next/link';

const BackButton = ({ path, text }) => {
    return (
        <div className={Style.BackButton}>
            <Link href={path}>
               {text}
            </Link>
            <Link href={path}>
                <FaArrowLeftLong className={Style.icon} />
            </Link>
        </div>
    )
}

export default BackButton;
