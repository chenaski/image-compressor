import { sendNewImagesInfo } from '~/api';
import { Button } from '~/components/button';
import { useImages } from '~/stores/images';

export interface OptionsProps {
  className?: string;
}
export const Options: React.FC<OptionsProps> = ({ className = '' }) => {
  const clearProcessed = useImages((state) => state.clearProcessed);
  const updateImages = async () => {
    // TODO: show error
    clearProcessed();
    await sendNewImagesInfo();
  };

  return (
    <div className={`flex flex-col bg-gray-200 p-5 ${className}`}>
      <Button className={'mt-auto'} onClick={updateImages}>
        Update
      </Button>
    </div>
  );
};
