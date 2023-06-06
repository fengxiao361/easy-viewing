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

  //解析
  const hanldeParsing = () => {
    const modal: any = document.getElementById('dialog-default');
    if (url.indexOf('http') == -1 && url.indexOf('https') == -1) {
      errType();
      return;
    }
    modal.showModal();

    timID = setInterval(() => {
      setProgressVal(prRef.current + 0.25);
      if (prRef.current >= 11) {
        clearInterval(timID);
        modal.close();
        window.open('https://jx.jsonplayer.com/player/?url=' + url);
      }
    }, 50);
  };

  //粘贴
  const handlePaste = (event: any) => {
    const clipboardData = event.clipboardData || window.clipboardData;
    console.log(clipboardData);
    const text = clipboardData.getData('text');
    console.log('粘贴的文本内容:', text);
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
          <li>2.填入上方input中点击解析即可进行安心食用</li>
          <li>
            <span className="nes-text is-error">
              tips:B站等弹幕网站可能存在无法正确解析情况
            </span>
          </li>
          <li>联系我：fengxiao361@qq.com</li>
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
