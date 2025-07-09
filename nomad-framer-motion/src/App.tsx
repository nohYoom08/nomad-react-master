import { AnimatePresence, motion } from 'motion/react';
import { forwardRef, useRef, useState } from 'react';

const Wrapper = forwardRef<HTMLDivElement, { children?: React.ReactNode }>(
    ({ children }, ref) => {
        return (
            <motion.div
                ref={ref}
                className="h-full w-full flex justify-center items-center bg-blue-300"
            >
                {children}
            </motion.div>
        );
    },
);

const Box = ({ children }: { children?: React.ReactNode }) => {
    const boxVariants = {
        initial: {
            x: 500,
            opacity: 0,
            scale: 0,
        },
        visible: {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateZ: 360,
            transition: {
                duration: 0.5,
            },
        },
        leaving: {
            opacity: 0,
            scale: 0,
            x: -500,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <motion.div
            className="absolute top-[50%] left-[50%] translate-[-50%] w-[100px] h-[100px] flex justify-center items-center bg-white text-[20px] rounded-[40px] shadow-[0_2px_3px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.06)]"
            variants={boxVariants}
            initial="initial"
            animate="visible" //transition은 animate, exit 속성 값에서 사용
            exit="leaving" // exit는 사라질 때 사용되는 애니메이션 (AnimatePresence 사용 시 활용)
        >
            {/* 이 때 start, end등의 이름은 variants내의 프로퍼티로 들어가게 됨 */}
            {children}
        </motion.div>
    );
};

export default function App() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(1);
    const nextPlease = () => setVisible(prev => (prev < 10 ? prev + 1 : 1));
    return (
        <Wrapper ref={wrapperRef}>
            <button
                className="absolute top-20 left-[50%] translate-x-[-50%]"
                onClick={nextPlease}
            >
                Next
            </button>
            <AnimatePresence>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item =>
                    item === visible ? <Box key={item}>{item}</Box> : null,
                )}
            </AnimatePresence>
        </Wrapper>
    );
}
