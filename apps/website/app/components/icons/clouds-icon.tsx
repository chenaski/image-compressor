import cloudsIconSrc from '../../assets/clouds-icon.png';

export const CloudsIcon: React.FC<{ className?: string }> = ({ className }) => {
  return <img className={className} src={cloudsIconSrc} srcSet={`${cloudsIconSrc} 2x`} alt={'Clouds icon'} />;
};
