import React from 'react';

interface IProps {
  orig: string;
  search?: string;
}

export const HighlightText: React.FC<IProps> = (props: IProps) => {
  const defaultRender = () => (
    <>
      <br />
      <small>{props.orig}</small>
    </>
  );

  if (props.search == null || props.search.length < 0) {
    return defaultRender();
  }

  const renderTextArray = (origText: string, searchText: string) => {
    const highlightTextIndex = origText.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase());
    const textArray = origText.toLocaleLowerCase().split(searchText.toLocaleLowerCase());
    if (textArray.length < 2) {
      return <span>{props.orig}</span>;
    }

    const renderedItems = [];
    let currentIndex = 0;
    for (let textArrIndex = 0; textArrIndex < textArray.length; textArrIndex++) {
      const textArrText = textArray[textArrIndex];
      renderedItems.push(
        <span key={`${currentIndex}-${textArrText}`}>
          {props.orig.substr(currentIndex, textArrText.length)}
          {textArrIndex < textArray.length - 1 && <span className="highlight">{props.orig.substr(highlightTextIndex, searchText.length)}</span>}
        </span>,
      );
      if (textArrText.length > 0) {
        currentIndex += textArrText.length + searchText.length;
      } else {
        // if highlighted text is at the beginning of the string
        currentIndex += searchText.length;
      }
    }
    return renderedItems;
  };

  return (
    <>
      <br />
      <small>{renderTextArray(props.orig, props.search)}</small>
    </>
  );
};
