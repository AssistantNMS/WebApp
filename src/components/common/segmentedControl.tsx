import React, { useRef, useState, useEffect } from 'react';

interface ISegmentedControlProps {
  name: string;
  options: Array<ISegmentedControlOptionProps>;
  defaultIndex: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  controlRef: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (newValue: any, index: number) => void;
}

interface ISegmentedControlOptionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: any;
  label: string;
  value: string;
}

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-a-segmented-control-component
 */
export const SegmentedControl: React.FC<ISegmentedControlProps> = (props: ISegmentedControlProps) => {
  const [activeIndex, setActiveIndex] = useState(props?.defaultIndex ?? 0);
  const [isReady, setIsReady] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const componentReady: any = useRef();

  // Determine when the component is "ready"
  useEffect(() => {
    if (isReady) return;
    setTimeout(() => {
      componentReady.current = true;
      setIsReady(true);
    }, 250);
  }, []);

  useEffect(() => {
    if (isReady === false) return;
    const activeSegmentRef = props.options[activeIndex].ref;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { offsetWidth, offsetLeft } = activeSegmentRef?.current as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { style } = props.controlRef?.current as any;

    style.setProperty('--highlight-width', `${offsetWidth}px`);
    style.setProperty('--highlight-x-pos', `${offsetLeft}px`);
  }, [activeIndex, props.callback, props.controlRef, props.options, isReady]);

  const onInputChange = (value: string, index: number) => {
    setActiveIndex(index);
    props.callback(value, index);
  };

  return (
    <div className="segmented-control" ref={props.controlRef}>
      <div className={`controls ${componentReady.current ? 'ready' : 'idle'}`}>
        {props.options?.map((item, i) => (
          <div
            key={item.value}
            className={`segment ${i === activeIndex ? 'active' : 'inactive'}`}
            ref={item.ref}
            style={{ width: `${(1 / props.options.length) * 100}%` }}
          >
            <input
              type="radio"
              value={item.value}
              id={item.label}
              name={props.name}
              onChange={() => onInputChange(item.value, i)}
              checked={i === activeIndex}
            />
            <label htmlFor={item.label}>{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
