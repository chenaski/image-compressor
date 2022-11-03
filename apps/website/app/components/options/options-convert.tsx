import type { OptionsSelectProps } from '~/components/options/options-select';
import { OptionsSelect } from '~/components/options/options-select';
import { OptionsRange } from '~/components/options/options-range';
import { OptionsTitle } from '~/components/options/options-title';
import { Codecs } from '~/constants';

export const OptionsConvert = () => {
  const codecs: OptionsSelectProps['items'] = [
    { title: 'WebP', value: Codecs.webp },
    { title: 'AVIF', value: Codecs.avif },
  ];

  return (
    <div className={'bg-gray-300 px-5 py-3'}>
      <OptionsTitle className={'mb-1'}>Convert</OptionsTitle>
      <OptionsSelect label={'Codec'} items={codecs} />
      <OptionsRange className={'mt-5'} label={'Quality'} />
    </div>
  );
};
