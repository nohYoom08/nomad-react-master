import {
    motion,
    MotionValue,
    useMotionValue,
    useScroll,
    useTransform,
} from 'motion/react';
import { forwardRef, useEffect, useRef } from 'react';

const Wrapper = forwardRef<
    HTMLDivElement,
    { children?: React.ReactNode; gradient: MotionValue<string> }
>(({ children, gradient }, ref) => {
    return (
        <motion.div
            ref={ref}
            className="h-[200dvh] w-full flex justify-center items-center"
            style={{
                background: gradient,
            }}
        >
            {children}
        </motion.div>
    );
});

const Box = ({
    children,
    wrapperRef,
    x,
    potato, // useTransform을 통해 변환된 값
    scale, // 스크롤 위치를 나타내는 MotionValue
}: {
    children?: React.ReactNode;
    wrapperRef: React.RefObject<HTMLDivElement | null>;
    x: MotionValue<number>;
    //MotionValue의 타입
    potato: MotionValue<number>;
    scale: MotionValue<number>;
}) => {
    const boxVariants = {
        start: {},
        end: {},
        drag: {
            backgroundColor: 'rgba(255, 150, 0, 1)',
            transition: { duration: 0.2 },
        },
    };

    return (
        <motion.div
            style={{ x, rotateZ: potato, scale }}
            className="w-[200px] h-[200px] bg-white rounded-[40px] shadow-[0_2px_3px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.06)]"
            variants={boxVariants}
            initial="start"
            animate="end"
            whileHover="hover" // hover는 마우스가 요소 위에 있을 때 적용되는 애니메이션 (variants 내에 정의된 hover 상태를 사용)
            drag="x"
            dragConstraints={wrapperRef}
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
    const wrapperRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    //애니메이션 이동을 하는데 console.log는 안 뜸 -> 리렌더링 없이 애니메이션만 실행된다는 뜻임 -> ReactJS 생태계에 있는 것이 아닌 것 (엄청난!)
    const potato = useTransform(x, [-800, 800], [-360, 360]);
    const gradient = useTransform(
        x,
        [-800, 0, 800],
        [
            'linear-gradient(135deg, rgb(0, 238, 198), rgb(0, 146, 85))',
            'linear-gradient(135deg, rgb(238,0,154), rgb(244, 145, 251))',
            'linear-gradient(135deg, rgb(234, 238, 0), rgb(241, 124, 0))',
        ],
    );
    //useMotionValue() px의 단위를 변환시켜줌2 => 문자열로도 변환이 가능 -> 색깔변화에도 활용 가능, 다만 이건 tailwindcss로 불가능
    const { scrollY, scrollYProgress } = useScroll();
    //useScroll() 스크롤 위치를 가져오는 훅, scrollY는 px단위, scrollYProgress는 0~1사이의 값으로 스크롤 위치를 나타냄
    const scale = useTransform(scrollYProgress, [0, 1], [0, 3]);
    useEffect(() => {
        scrollY.on('change', () =>
            console.log(scrollY.get(), scrollYProgress.get()),
        );
    }, [scrollYProgress, scrollY]);

    return (
        <Wrapper ref={wrapperRef} gradient={gradient}>
            <button onClick={() => x.set(200)}>click me</button>
            <Box
                x={x}
                wrapperRef={wrapperRef}
                potato={potato}
                scale={scale}
            ></Box>
            {/* Box태그에 style={{x}}를 작성하여 useMotionValue를 연결할 예정 */}
        </Wrapper>
    );
}
