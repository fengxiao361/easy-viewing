import React, { CSSProperties, PropsWithChildren } from 'react';
import styles from './index.less';

type CardProps = PropsWithChildren & {
  title?: string;
  titleColor?: CSSProperties['color'];
  bg?: CSSProperties['color'];
};

const Card: React.FC<CardProps> = (props) => {
  const { children, title, titleColor = '#000', bg = '#ffd03f' } = props;
  return (
    <>
      <div className={styles.head} style={{ color: titleColor }}>
        {title}
      </div>
      <div className={styles.content} style={{ backgroundColor: bg }}>
        {children}
      </div>
    </>
  );
};

export default Card;
