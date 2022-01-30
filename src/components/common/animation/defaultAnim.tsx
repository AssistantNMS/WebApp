
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface IProps {
    children: ReactNode;
}

const defaultPageVariants = {
    initial: {
        opacity: 0,
    },
    in: {
        opacity: 1,
    },
    out: {
        opacity: 0,
    },
}

export const DefaultAnimation: React.FC<IProps> = (props: IProps) => {
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            transition={{ duration: 0.15 }}
            variants={defaultPageVariants}
        >
            {props.children}
        </motion.div>
    );
}