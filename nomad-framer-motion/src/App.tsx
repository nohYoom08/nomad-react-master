import { AnimatePresence, motion } from 'motion/react';
import { forwardRef, useRef, useState } from 'react';

const Wrapper = forwardRef<HTMLDivElement, { children?: React.ReactNode }>(
    ({ children }, ref) => {
        return (
            <motion.div
                ref={ref}
                className="h-full w-full flex flex-col justify-center items-center gap-[40px] bg-blue-300"
            >
                {children}
            </motion.div>
        );
    },
);

const Box = ({ children }: { children?: React.ReactNode }) => {
    const boxVariants = {
        initial: {
            opacity: 0,
            scale: 0,
        },
        visible: {
            opacity: 1,
            scale: 1,
            rotateZ: 360,
        },
        leaving: {
            opacity: 0,
            y: 20,
        },
    };

    return (
        <motion.div
            className="w-[200px] h-[200px] bg-white rounded-[40px] shadow-[0_2px_3px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.06)]"
            variants={boxVariants}
            initial="initial"
            animate="visible"
            exit="leaving" // exit는 사라질 때 사용되는 애니메이션 (AnimatePresence 사용 시 활용)
        >
            {/* 이 때 start, end등의 이름은 variants내의 프로퍼티로 들어가게 됨 */}
            {children}
        </motion.div>
    );
};

export default function App() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [showing, setShowing] = useState(false);
    const onClickShowing = () => setShowing(prev => !prev);
    return (
        <Wrapper ref={wrapperRef}>
            <button
                className="absolute top-20 left-[50%] transform -translate-x-1/2"
                onClick={onClickShowing}
            >
                Click
            </button>
            <AnimatePresence> {showing ? <Box></Box> : null}</AnimatePresence>
        </Wrapper>
    );
}
