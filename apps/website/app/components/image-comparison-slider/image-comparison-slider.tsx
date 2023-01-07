export const ImageComparisonSlider = ({
  leftImageSrc,
  rightImageSrc,
  transform,
}: {
  leftImageSrc: string;
  rightImageSrc: string;
  transform: string;
}) => {
  const rightImageStyles: React.CSSProperties = {
    clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
  };

  return (
    <div className={'pointer-events-none relative min-h-0 grow select-none'} style={{ transform }}>
      <img className={'h-full max-h-full'} src={leftImageSrc} alt="Before optimisation" />
      <img
        className={'absolute top-0 left-0 h-full'}
        src={rightImageSrc}
        alt="After optimisation"
        style={rightImageStyles}
      />
    </div>
  );
};
