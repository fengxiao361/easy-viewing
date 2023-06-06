import { Outlet } from 'umi';
import styles from './index.less';

export default function BasicLayout() {
  return (
    <div className={styles.wrap}>
      <Outlet />
    </div>
  );
}
