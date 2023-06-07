import Card from '@/components/Card';
import { useEffect, useRef, useState } from 'react';
import styles from './home.less';

let timID: any;
const HomePage = () => {
  const [url, setUrl] = useState<string>('');
  const [progressVal, setProgressVal] = useState<number>(0);
  const [tipsType, setTipsType] = useState<boolean>(true);
  const prRef = useRef<number>(0);

  prRef.current = progressVal;

  useEffect(() => {
    return () => {
      timID && clearInterval(timID);
    };
  }, []);
  const browserName = navigator.userAgent.toLowerCase();
  console.log('Browser Name and Version:', browserName);
  //解析
  const hanldeParsing = () => {
    const duration = 300; // 动画持续时间，单位为毫秒
    const startTime = performance.now(); //动画开始时间
    const browserName = navigator.userAgent;
    console.log('Browser Name and Version:', browserName);
    const modal: any = document.getElementById('dialog-default');
    if (url.indexOf('http') == -1 && url.indexOf('https') == -1) {
      errType();
      return;
    }
    modal.showModal();
    const setVal = (currentTime: any) => {
      const elapsedTime = currentTime - startTime; // 计算已经过去的时间
      // 根据已经过去的时间计算动画进度
      const progress = Math.min(elapsedTime / duration, 10);
      setProgressVal(progress);
      if (progress < 10) {
        // 如果动画未完成，则继续执行下一帧
        requestAnimationFrame(setVal);
      } else {
        modal.close();
        const link = document.createElement('a');
        link.href = 'https://jx.jsonplayer.com/player/?url=' + url;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setProgressVal(0);
      }
    };

    requestAnimationFrame(setVal);
  };

  //粘贴
  const handlePaste = (event: any) => {
    const clipboardData = event.clipboardData || window.clipboardData;
    const text = clipboardData.getData('text');
    if (text.indexOf('http') == -1 && text.indexOf('https') == -1) {
      errType();
      return;
    }
    setUrl(text);
  };

  const handleUrlChange = (e: any) => {
    const value = e.target.value;
    setUrl(value);
  };

  const errType = () => {
    const modal: any = document.getElementById('dialog-default');
    setTipsType(false);
    modal.showModal();
    setTimeout(() => {
      modal.close();
      setTipsType(true);
    }, 1800);
  };

  return (
    <div className={styles.wrap}>
      <Card title="影视解析">
        <div className="nes-container with-title is-centered">
          <p className="title" style={{ backgroundColor: '#ffd03f' }}>
            警告
          </p>
          <p>此工具仅限个人使用，请勿用于盈利！</p>
        </div>
        <div className="nes-field" style={{ marginTop: 25 }}>
          <label>填入复制的 url</label>
          <input
            type="text"
            className="nes-input"
            placeholder="请粘贴URL"
            value={url}
            onChange={handleUrlChange}
            onPaste={handlePaste}
          />
          <div className={styles.bth_box}>
            <button
              onClick={hanldeParsing}
              type="button"
              className="nes-btn is-primary"
              style={{ width: 200 }}
            >
              解析
            </button>
          </div>
        </div>
        <ul className={`nes-list ${styles.tips_box}`}>
          <li>使用教程.</li>
          <li>1.复制需要观看的视频url地址</li>
          <li>2.填入上方input中点击解析即可</li>
          <li>
            <span className="nes-text is-error">
              tips:B站等弹幕网站可能存在无法正确解析情况
            </span>
          </li>
          <li>此工具基于JSONPlayer搭建</li>
        </ul>
      </Card>

      {/* <!-- Dialog --> */}
      <dialog className="nes-dialog" id="dialog-default">
        <div style={{ width: 200 }}>
          {tipsType ? (
            <>
              <p style={{ textAlign: 'center' }}>
                {progressVal <= 10 ? '解析中...' : '已完成...'}
              </p>
              {progressVal && progressVal <= 10 ? (
                <progress
                  className="nes-progress is-success"
                  value={progressVal}
                  max="10"
                  style={{ height: 20 }}
                />
              ) : null}
            </>
          ) : (
            <>
              <p className="title">错误</p>
              <span className="nes-text is-error">
                Error:请输入正确 url 地址
              </span>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
};
export default HomePage;
