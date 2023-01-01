export const ImageComparisonSlider = ({
  leftImageSrc,
  rightImageSrc,
}: {
  leftImageSrc: string;
  rightImageSrc: string;
}) => {
  const rightImageStyles: React.CSSProperties = {
    clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
  };
  return (
    <div className={'relative min-h-0'}>
      <img className={'max-h-full'} src={leftImageSrc} alt="Before optimisation" />
      <img className={'absolute top-0 left-0'} src={rightImageSrc} alt="After optimisation" style={rightImageStyles} />
    </div>
  );
};
