import { motion } from 'motion/react';

const Wrapper = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className="h-full w-full flex justify-center items-center bg-blue-100">
            {children}
        </div>
    );
};

const Box = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className="w-[200px] h-[200px] bg-white rounded-[10px] shadow-[0_2px_3px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.06)]">
            {children}
        </div>
    );
};

export default function App() {
    return (
        <Wrapper>
            <Box></Box>
            <motion.div></motion.div>
        </Wrapper>
    );
}
