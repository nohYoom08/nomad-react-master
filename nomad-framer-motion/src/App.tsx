import { easeInOut, motion } from 'motion/react';

const Wrapper = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className="h-full w-full flex justify-center items-center bg-blue-100">
            {children}
        </div>
    );
};

const Box = ({ children }: { children?: React.ReactNode }) => {
    const myVars = {
        start: { scale: 0 },
        end: {
            scale: 1,
            borderRadius: '10%',
            rotateZ: 360,
            transition: {
                type: 'spring' as const,
                duration: 5,
                ease: easeInOut, // easeInOut 함수 사용
                // ease : 'easeInOut', // 이렇게 문자열로 하면 안 됨
                // ease: [0.42, 0, 0.58, 1] as [number, number, number, number], // 또는 이렇게 배열로도 가능
                damping: 3, // 진동감 조절 (type: 'spring'일 때 적용되는 속성. 기타 다른 속성에 대한 정보는 공식문서의 'spring' 섹션 참고)
                bounce: 0.25, // 튕김 효과 조절
                // stiffness: 1, // 강도 조절
            },
        },
    };

    return (
        <motion.div variants={myVars} initial="start" animate="end">
            {/* 이 때 start, end등의 이름은 variants내의 프로퍼티로 들어가게 됨 */}
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
