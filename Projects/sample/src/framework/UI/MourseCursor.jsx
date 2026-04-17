const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useSpring(cursorX, { stiffness: 80, damping: 18 });
  const trailY = useSpring(cursorY, { stiffness: 80, damping: 18 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    const over = (e) => { if (e.target.closest('button, a, input, textarea')) setHovered(true); };
    const out  = (e) => { if (e.target.closest('button, a, input, textarea')) setHovered(false); };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over); window.removeEventListener('mouseout', out); };
  }, []);

  return (
    <>
      {/* dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%', width: 8, height: 8, background: 'rgb(2 174 178)' }}
        animate={{ scale: hovered ? 2 : 1 }}
        transition={{ duration: 0.15 }}
      />
      {/* ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border"
        style={{ x: trailX, y: trailY, translateX: '-50%', translateY: '-50%', width: hovered ? 48 : 36, height: hovered ? 48 : 36, borderColor: 'rgba(2,174,178,0.4)' }}
        animate={{ scale: hovered ? 1.2 : 1, opacity: hovered ? 0.7 : 0.4 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};

export default CustomCursor;