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
        //motion관련 대표적인 props 모음
        <motion.div
            className="w-[200px] h-[200px] bg-white rounded-[10px] shadow-[0_2px_3px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.06)]"
            initial={{ scale: 0 }}
            animate={{ scale: 1, borderRadius: '10%', rotateZ: 360 }}
            transition={{
                type: 'spring',
                duration: 5,
                ease: 'easeInOut',
                damping: 3, // 진동감 조절 (type: 'spring'일 때 적용되는 속성. 기타 다른 속성에 대한 정보는 공식문서의 'spring' 섹션 참고)
                bounce: 0.25, // 튕김 효과 조절
                // stiffness: 1, // 강도 조절
            }}
        >
            {children}
        </motion.div>
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
