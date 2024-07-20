import React from 'react';
import ReactMarkdown from 'react-markdown';

interface IProps {
  markdown: string;
}

export const Markdown: React.FC<IProps> = (props: IProps) => {
  return <ReactMarkdown skipHtml={false}>{props.markdown}</ReactMarkdown>;
};
