///Home.tsx
import { motion } from 'framer-motion';
import React from 'react';
import { fadeIn } from './veriants';

const Home: React.FC = () => {
    return (
        <div className='flex justify-center items-center mt-56'>
            <motion.div
                variants={fadeIn("up", 0.25)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.3 }}
                className='text-center'>
                <h1 className=' text-5xl md:text-7xl mainlogo'>Oontop-Health </h1>
                <p className='mt-8 dark:text-white'>Data, Driven, Workflows</p>
            </motion.div>

        </div>
    );
};

export default Home;