import { motion } from 'motion/react';
import { forwardRef, useRef, useState } from 'react';

const Wrapper = forwardRef<
    HTMLDivElement,
    { children?: React.ReactNode; onClick?: () => void }
>(({ children, onClick }, ref) => {
    return (
        <motion.div
            ref={ref}
            className="h-full w-full flex justify-center items-center bg-blue-300 gap-[12px]"
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
});

const Box = ({ children }: { children?: React.ReactNode }) => {
    return (
        <motion.div className="w-[400px] h-[400px] flex justify-center items-center bg-white text-[20px] rounded-[40px] shadow-[0_2px_3px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.06)]">
            {/* 이 때 start, end등의 이름은 variants내의 프로퍼티로 들어가게 됨 */}
            {children}
        </motion.div>
    );
};

const Circle = ({ layoutId }: { layoutId: string }) => {
    return (
        <motion.div
            layoutId={layoutId}
            className="h-[100px] w-[100px] rounded-[50px] bg-[#00a5ff] shadow-[0_2px_3px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.06)]"
        ></motion.div>
    );
};

export default function App() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [clicked, setClicked] = useState(false);
    const onClickClicked = () => setClicked(prev => !prev);
    return (
        <Wrapper ref={wrapperRef} onClick={onClickClicked}>
            <Box>
                {!clicked ? <Circle layoutId="circle" /> : null}
                {/* 같은 layoutId를 가진 Circle 컴포넌트가 서로다른 언마운트 타이밍을 가질 때, 
                    한 쪽이 사라지고 한 쪽이 나타나는 둘 사이의 애니메이션을 생성해줌(한 쪽에서 다른 쪽으로 자연스럽게 이동) */}
            </Box>
            <Box>{clicked ? <Circle layoutId="circle" /> : null}</Box>
        </Wrapper>
    );
}
