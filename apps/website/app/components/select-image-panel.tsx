import { Spinner } from '~/components/spinner';
import type { ImagesState } from '~/stores/images';

export interface ImageSelectPanelProps {
  images: ImagesState['images'];
  selectedImageId: string;
  setSelectedImageId: (id: string) => void;
}

export const SelectImagePanel = ({ images, selectedImageId, setSelectedImageId }: ImageSelectPanelProps) => {
  return (
    <div className={'mt-4 flex shrink-0 gap-2 overflow-x-auto'}>
      {Object.entries(images).map(([id, { source, processed }]) => {
        return (
          <button
            key={id}
            className={`group relative h-[62px] w-[62px] overflow-hidden rounded border border-gray-200 bg-gray-200 transition hover:border-gray-400 ${
              id === selectedImageId ? 'border-2 border-black' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageId(id);
            }}
          >
            <img
              className={`h-full w-full object-cover transition group-hover:scale-110 group-hover:opacity-100 ${
                id === selectedImageId ? '' : 'opacity-80'
              } ${!processed ? 'blur-[1px]' : ''}`}
              src={source.url}
              alt=""
            />
            {!processed && <Spinner className={'absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'} />}
          </button>
        );
      })}
    </div>
  );
};
