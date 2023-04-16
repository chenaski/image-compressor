export const Colors = () => {
  return (
    <div className={'flex flex-col'}>
      {Object.entries({
        Text: ['bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-inverted'],
        Background: ['bg-bgBase', 'bg-bgPrimary', 'bg-bgSecondary', 'bg-bgTertiary'],
        Icon: ['bg-iconPrimary', 'bg-iconSecondary', 'bg-iconInverted'],
        Stroke: ['bg-strokeFieldDefault', 'bg-strokeFieldActive', 'bg-strokeSecondary'],
        Monochrome: ['bg-white', 'bg-black', 'bg-accent'],
        State: ['bg-accentHover', 'bg-accentActive', 'bg-secondaryHover', 'bg-secondaryActive'],
      }).map(([colorsGroupName, colors]) => {
        return (
          <div className={'py-8'}>
            <h2>{colorsGroupName}</h2>

            <div className={'grid grid-cols-3 gap-8'}>
              {colors.map((color) => (
                <div key={color} className="flex items-center gap-4">
                  <div className={`h-[40px] w-[40px] rounded-full border border-[#0000001F] ${color}`} />
                  <div>{color.replace('bg-', '')}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
