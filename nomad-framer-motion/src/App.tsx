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

const Overlay = ({
    children,
    onClick,
}: {
    children?: React.ReactNode;
    onClick?: () => void;
}) => {
    return (
        <motion.div
            initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            animate={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
            exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            onClick={onClick}
            className="absolute flex justify-center items-center w-full h-full"
        >
            {children}
        </motion.div>
    );
};

const Grid = ({ children }: { children?: React.ReactNode }) => {
    return <div className="grid-container">{children}</div>;
};

const Box = ({
    children,
    style,
    layoutId,
    onClick,
}: {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    layoutId?: string;
    onClick?: () => void;
}) => {
    return (
        <motion.div
            onClick={onClick}
            style={style}
            layoutId={layoutId}
            className="text-[20px] bg-white h-[200px] flex justify-center items-center rounded-[40px] shadow-[0_2px_3px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.06)]"
        >
            {/* 이 때 start, end등의 이름은 variants내의 프로퍼티로 들어가게 됨 */}
            {children}
        </motion.div>
    );
};

export default function App() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [currentId, setCurrentId] = useState(-1);
    return (
        <Wrapper ref={wrapperRef}>
            <Grid>
                {[1, 2, 3, 4].map(i => (
                    <Box
                        layoutId={`hello-${i}`}
                        key={i}
                        onClick={() => setCurrentId(i)}
                    >
                        {i}
                    </Box>
                ))}
            </Grid>
            {currentId !== -1 ? (
                <Overlay onClick={() => setCurrentId(-1)}>
                    <Box
                        layoutId={`hello-${currentId}`}
                        style={{ width: '400px', height: '200px' }}
                    >
                        {currentId}
                    </Box>
                </Overlay>
            ) : null}
        </Wrapper>
    );
}
