import * as React from 'react';
import { ILazyLoadImageProps } from './ILazyLoadImageProps';

const ReactLazy = require('react-lazy-load-image-component');

interface IState {
  imageNotFound: boolean;
}

export class LazyLoadImage extends React.Component<ILazyLoadImageProps, IState> {
  constructor(props: ILazyLoadImageProps) {
    super(props);

    this.state = {
      imageNotFound: false,
    };
  }

  errorLoadingImage = () => {
    this.setState({
      imageNotFound: true,
    });
  };

  render() {
    const { src, notFoundImageSrc, ...unused } = this.props;
    const notFoundImageSource = notFoundImageSrc || '/assets/images/unknown.png';
    const imageSource = src && src.length > 5 ? src : notFoundImageSrc;
    return (
      <ReactLazy.LazyLoadImage
        placeholderSrc={'/assets/images/loader.svg'}
        src={this.state.imageNotFound ? notFoundImageSource : imageSource}
        title={this.props.title ? this.props.title : this.props.alt}
        height={this.props.height}
        effect={this.props.effect ? this.props.effect : 'blur'}
        onError={this.errorLoadingImage}
        draggable={false}
        {...unused}
      />
    );
  }
}
