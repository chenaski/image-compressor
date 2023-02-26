import { OptionsRange } from '~/components/options/options-range';
import { OptionsTitle } from '~/components/options/options-title';

export const OptionsConvert = () => {
  return (
    <div className={'bg-gray-300 px-5 py-3'}>
      <OptionsTitle className={'mb-1'}>Convert</OptionsTitle>
      <OptionsRange className={'mt-5'} label={'Quality'} />
    </div>
  );
};
