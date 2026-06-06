type IconProps = {
    name: string;
 className?: string;
}

export const Icon = ({ name, className = '' }: IconProps) => {
  return (
    <svg className={className}>
      <use href={`/icons-sprite.svg#${name}`} />
    </svg>
  );
};