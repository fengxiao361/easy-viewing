import Card from '@/components/Card';
import { useEffect, useRef, useState } from 'react';
import styles from './home.less';

let timID: any;
const HomePage = () => {
  const [url, setUrl] = useState<string>('');
  const [source, setSource] = useState<string>('https://jx.aidouer.net/?url=');
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
  const handleParsing = () => {
    const duration = 300; // 动画持续时间，单位为毫秒
    const startTime = performance.now(); //动画开始时间
    const modal: any = document.getElementById('dialog-default');
    if (!url.startsWith('http')) {
      errType();
      return;
    }
    modal.showModal();
    const setVal = (currentTime: number) => {
      const elapsedTime = currentTime - startTime; // 计算已经过去的时间
      // 根据已经过去的时间计算动画进度
      const progress = Math.min(elapsedTime / duration, 10);
      setProgressVal(progress);
      if (progress < 10) {
        // 如果动画未完成，则继续执行下一帧
        requestAnimationFrame(setVal);
      } else {
        modal.close();
        window.open(source + url, '_blank'); // 使用window.open代替创建和删除a标签
        setProgressVal(0);
      }
    };

    requestAnimationFrame(setVal);
  };

  //粘贴
  const handlePaste = (event: any) => {
    //@ts-ignore
    const clipboardData = event.clipboardData || window.clipboardData;
    const text = clipboardData.getData('text');
    if (!text.startsWith('http')) {
      errType();
      return;
    }
    setUrl(text);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 使用React.ChangeEvent和HTMLInputElement类型代替any
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

  //解析地址设置
  const handleSelectChange = (e: any) => {
    setSource(e.target.value);
  };

  const handleJumpToUrl = (toUrl: string) => {
    window.open(toUrl, '_blank'); // 使用window.open代替创建和删除a标签
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
          <label>选择解析源地址</label>
          <div className="nes-select">
            <select
              defaultValue={source}
              onChange={handleSelectChange}
              required
              id="default_select"
            >
               <option value={https://jx.m3u8.tv/jiexi/?url='}>
                无广告【全网解析】
              </option>
              <option value={'https://jx.aidouer.net/?url='}>
                aidouer解析
              </option>
              <option value={'https://jx.jsonplayer.com/player/?url='}>
                jsonplayer解析
              </option>
              <option value={'https://jx.bozrc.com:4433/player/?url='}>
                bozrc解析
              </option>
              <option value={'https://jx.playerjy.com/?ads=0&url='}>
                playerjy解析
              </option>
              <option value="https://www.wannengjiexi.com/jiexi1/?url=">
                wannengjiexi解析
              </option>
              <option value="https://www.ckmov.com/?url=">ckmov解析</option>
              <option value="https://jx.ppflv.com/?url=">ppflv解析</option>
              <option value="https://yun.nxflv.com/?url=">yunnxflv解析</option>
            </select>
          </div>
          <section style={{ marginTop: 25 }}>
            <label>填入复制的 url</label>
            <input
              type="text"
              className="nes-input"
              placeholder="请粘贴URL"
              value={url}
              onChange={handleUrlChange}
              onPaste={handlePaste}
            />
          </section>
          <div className={styles.bth_box}>
            <button
              onClick={setUrl.bind(this, '')}
              type="button"
              className="nes-btn"
              style={{ width: 120 }}
            >
              清空
            </button>
            <button
              onClick={handleParsing}
              type="button"
              className="nes-btn is-primary"
              style={{ width: 120, marginLeft: 15 }}
            >
              解析
            </button>
          </div>

          <section className={styles.jump}>
            <span
              className="nes-text is-primary"
              onClick={handleJumpToUrl.bind(this, 'https://v.qq.com/')}
            >
              腾讯视频
            </span>
            <span
              className="nes-text is-primary"
              onClick={handleJumpToUrl.bind(this, 'https://www.iqiyi.com/')}
            >
              爱奇艺
            </span>
            <span
              className="nes-text is-primary"
              onClick={handleJumpToUrl.bind(
                this,
                'https://www.mgtv.com/index.html',
              )}
            >
              芒果TV
            </span>
            <span
              className="nes-text is-primary"
              onClick={handleJumpToUrl.bind(this, 'https://www.bilibili.com/')}
            >
              BiliBili
            </span>
          </section>
        </div>
        <ul className={`nes-list ${styles.tips_box}`}>
          <li>使用教程.</li>
          <li>1.复制需要观看的视频url地址</li>
          <li>2.填入上方input中点击解析即可</li>
          <li>3.如解析失败可更换不同解析源进行解析</li>
          <li>
            <span className="nes-text is-error">
              tips:B站等弹幕网站可能存在无法正确解析情况
            </span>
          </li>
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
