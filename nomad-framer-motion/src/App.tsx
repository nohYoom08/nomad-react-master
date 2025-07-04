import { motion } from 'motion/react';

const Wrapper = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className="h-full w-full flex justify-center items-center bg-blue-500">
            {children}
        </div>
    );
};

const Box = ({ children }: { children?: React.ReactNode }) => {
    const boxVariants = {
        start: {},
        end: {},
        hover: { scale: 1.5, rotateZ: 360 },
        click: { scale: 1, borderRadius: '100%' },
        drag: {
            backgroundColor: 'rgba(255, 150, 0, 1)',
            transition: { duration: 0.2 },
        },
    };

    return (
        <motion.div
            className="w-[200px] h-[200px] bg-white rounded-[40px] shadow-[0_2px_3px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.06)]"
            variants={boxVariants}
            initial="start"
            animate="end"
            whileHover="hover" // hover는 마우스가 요소 위에 있을 때 적용되는 애니메이션 (variants 내에 정의된 hover 상태를 사용)
            whileTap="click" // click은 요소가 클릭되었을 때 적용되는 애니메이션 (variants 내에 정의된 click 상태를 사용)
            drag
            whileDrag="drag"
        >
            {/* 이 때 start, end등의 이름은 variants내의 프로퍼티로 들어가게 됨 */}
            {children}
        </motion.div>
    );
};

export default function App() {
    return (
        <Wrapper>
            <Box></Box>
        </Wrapper>
    );
}
