import { useImages } from '~/stores/images';

export const Uploaded = () => {
  const { images } = useImages();

  return (
    <div className={'flex overflow-x-auto'}>
      {Object.values(images).map(({ source, processed }) => {
        return (
          <div key={source}>
            <img className={'h-[300px]'} src={source} alt="" width={'auto'} height={300} />
            {processed && <img className={'h-[300px]'} src={processed} alt="" width={'auto'} height={300} />}
          </div>
        );
      })}
    </div>
  );
};
