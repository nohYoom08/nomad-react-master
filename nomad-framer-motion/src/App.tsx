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
        start: { opacity: 0, scale: 0.5 },
        end: {
            opacity: 1,
            scale: 1,

            transition: {
                type: 'spring' as const,
                duration: 0.5,
                bounce: 0.5,
                delayChildren: 0.5, // Circle의 애니메이션이 시작되기 전에 Box의 애니메이션이 끝나도록 함
                staggerChildren: 0.2, // Circle의 애니메이션이 순차적으로 실행되도록 함
            },
        },
    };

    return (
        <motion.div
            className="w-[200px] h-[200px] grid grid-cols-2 bg-white/20 rounded-[10px] shadow-[0_2px_3px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.06)]"
            variants={boxVariants}
            initial="start"
            animate="end"
        >
            {/* 이 때 start, end등의 이름은 variants내의 프로퍼티로 들어가게 됨 */}
            {children}
        </motion.div>
    );
};

const Circle = ({ children }: { children?: React.ReactNode }) => {
    const circleVariants = {
        start: {
            opacity: 0,
            // scale: 0,
            y: -10,
        },
        end: {
            opacity: 1,
            y: 0, //위에서 내려오는 효과 (페이드인에 활용), motion에서 제공해주는 속성
            // scale: 2,
            // transition: {
            //     type: 'spring' as const,
            //     // 'spring' 또는 'tween', 'inertia' 이 셋중에만 가능하다는 의미로, 단순 'spring'이라고만 적으면 타입이 맞지 않음. as const를 붙여서 타입을 고정시켜야 함
            //     bounce: 0.8,
            //     duration: 5,
            //     delay: 0.5, //부모컴포넌트인 Box의 animate가 끝난 후에 Circle의 애니메이션이 시작되도록 함. But, Box에 직접 delayChildren이라는 속성을 넣을 수도 있음
            // },
        },
    };
    return (
        <motion.div
            className="w-[70px] h-[70px] place-self-center bg-white rounded-[35px] shadow-[0_2px_3px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.06)]"
            variants={circleVariants}
        >
            {children}
        </motion.div>
    );
};

export default function App() {
    return (
        <Wrapper>
            <Box>
                {/* Box의 initial, animate의 프로퍼티들이 기본적으로 Circle에 상속됨. Circle만의 자기 variants를 넣으면 됨 */}
                <Circle></Circle>
                <Circle></Circle>
                <Circle></Circle>
                <Circle></Circle>
            </Box>
        </Wrapper>
    );
}
