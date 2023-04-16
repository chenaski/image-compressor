export const Shadows = () => {
  return (
    <div className={'grid grid-cols-1 gap-8 pt-6'}>
      {[
        'shadow-blockPrimary',
        'shadow-blockLarge',
        'shadow-buttonPrimary',
        'shadow-buttonPrimaryHover',
        'shadow-buttonPrimaryActive',
        'shadow-buttonSecondary',
        'shadow-slider',
        'shadow-toggle',
        'shadow-tab',
        'shadow-solid',
      ].map((shadow) => (
        <div key={shadow} className="flex items-center gap-4">
          <div className={`h-[40px] w-[40px] rounded-full ${shadow}`} />
          <div>{shadow.replace('shadow-', '')}</div>
        </div>
      ))}
    </div>
  );
};
