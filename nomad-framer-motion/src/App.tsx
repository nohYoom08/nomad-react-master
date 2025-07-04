import { motion } from 'motion/react';
import { forwardRef, useRef } from 'react';

const Wrapper = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className="h-full w-full flex justify-center items-center bg-blue-500">
            {children}
        </div>
    );
};

//forwardRef: 부모컴포넌트에서 BiggerBox에 ref속성을 직접 작성할 수 있도록 하는 문법
const BiggerBox = forwardRef<HTMLDivElement, { children?: React.ReactNode }>(
    ({ children }, ref) => {
        return (
            <div
                ref={ref}
                className="h-[600px] w-[600px] flex justify-center items-center rounded-[40px] bg-[rgba(255,255,255,0.6)]"
            >
                {children}
            </div>
        );
    },
);

const Box = ({
    children,
    biggerBoxRef,
}: {
    children?: React.ReactNode;
    biggerBoxRef: React.RefObject<HTMLDivElement | null>;
    // biggerBoxRef: React.RefObject<HTMLDivElement> | null; 이라고 작성하면 RefObject에 대한 타입이 아닌 그냥 썡 null이 들어가게 됨
    // 밑에 dragConstraints={biggerBoxRef}에서 biggerBoxRef가 null이 될 수 없기 때문에 오류가 발생함
}) => {
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
            // drag="x"
            // dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
            dragConstraints={biggerBoxRef} // 부모컴포넌트 내부에서만 드래그 가능
            dragSnapToOrigin // 드래그가 끝나면 원래 위치로 돌아감
            dragElastic={0}
            // 드래그 제한 범위 바깥에서 얼마나 탄력적으로 움직일지 설정
            // 1이면 100퍼센트, 전 범위까지 드래그 가능 / 0이면 제한범위 내에서 벗어나질 않음 (벽에 접함)
            whileDrag="drag"
        >
            {/* 이 때 start, end등의 이름은 variants내의 프로퍼티로 들어가게 됨 */}
            {children}
        </motion.div>
    );
};

export default function App() {
    const biggerBoxRef = useRef<HTMLDivElement>(null);
    return (
        <Wrapper>
            <BiggerBox ref={biggerBoxRef}>
                <Box biggerBoxRef={biggerBoxRef}></Box>
            </BiggerBox>
        </Wrapper>
    );
}
