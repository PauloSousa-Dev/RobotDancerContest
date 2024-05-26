import styles from "./style.module.scss";
import cx from "classnames";

type ImageProps = {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  onClick?: () => void;
  onLoad?: () => void;
  onError?: () => void;
};

const Image = ({
  src,
  alt,
  className = "",
  onClick,
  onLoad,
  onError,
}: ImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cx(styles.imageDefault, className)}
      onClick={onClick}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export { Image };
