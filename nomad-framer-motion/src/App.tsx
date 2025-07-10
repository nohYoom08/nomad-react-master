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

const Box = ({
    children,
    custom,
}: {
    children?: React.ReactNode;
    custom: number;
}) => {
    const boxVariants = {
        entry: (custom: number) => ({
            x: custom * 500,
            opacity: 0,
            scale: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateZ: 360,
            transition: {
                duration: 0.5,
            },
        },
        exit: (custom: number) => ({
            x: custom * -500,
            opacity: 0,
            scale: 0,
            transition: {
                duration: 0.5,
            },
        }),
    };

    return (
        <motion.div
            className="absolute top-[50%] left-[50%] translate-[-50%] w-[100px] h-[100px] flex justify-center items-center bg-white text-[20px] rounded-[40px] shadow-[0_2px_3px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.06)]"
            variants={boxVariants}
            initial="entry"
            animate="center"
            exit="exit"
            custom={custom}
        >
            {/* 이 때 start, end등의 이름은 variants내의 프로퍼티로 들어가게 됨 */}
            {children}
        </motion.div>
    );
};

export default function App() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(1);
    const [custom, setCustom] = useState(1);
    const nextPlease = async () => {
        await setCustom(1);
        //async-await을 넣는 이유 :
        //next버튼만 누르다가 prev버튼을 누르면, 사라져야되는 번호 요소가 prev방향으로 사라져야하는데 기존의 next방향으로 사라짐
        //그러다가 두 번째부터는 prev방향으로 잘 사라지고 나타나다가, 다시 next버튼을 누르면 반대의 상황이 또 연출
        //custom값이 변경되지 않은 상황에서 애니메이션이 실행됐기 때문 (버튼 클릭 시 사라져야하는 요소의 varaints가)
        //그래서 custom값을 변경하는 setCustom을 await로 감싸서, custom값이 변경된 후에 애니메이션이 실행되도록 함
        setVisible(prev => (prev < 10 ? prev + 1 : 1));
    };
    const prevPlease = async () => {
        await setCustom(-1);
        setVisible(prev => (prev > 1 ? prev - 1 : 10));
    };
    return (
        <Wrapper ref={wrapperRef}>
            <button
                className="absolute top-20 left-[50%] translate-x-[-50%]"
                onClick={nextPlease}
            >
                Next
            </button>
            <button
                className="absolute top-25 left-[50%] translate-x-[-50%]"
                onClick={prevPlease}
            >
                Prev
            </button>
            <AnimatePresence mode="wait">
                {/* mode="wait"는 exit 애니메이션이 끝날 때까지 새로운 컴포넌트가 나타나지 않도록 함 */}
                {/* 예를 들어 1번에서 next버튼을 누른다면, 1번이 완전히 사라지고 나서야 2번이 등장함 */}
                <Box key={visible} custom={custom}>
                    {visible}
                </Box>
                {/* 단순히 key를 넣어주기만 해도 해당 컴포넌트가 변경될 때마다 exit 애니메이션이 실행됨
                그 이유는 key가 변경되면 컴포넌트가 새로 리렌더링되기 때문 */}
            </AnimatePresence>
        </Wrapper>
    );
}
