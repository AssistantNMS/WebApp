import { translate } from '../../localization/Translate';
import React, { useEffect, useState } from 'react';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { CardButton } from '../../components/common/button/cardButton';
import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { DataJsonService } from '../../services/json/DataJsonService';
import { SocialItem } from '../../contracts/data/socialItem';

interface IWithDepInj {
  dataJsonService: DataJsonService;
}
interface IWithoutDepInj {}

interface IProps extends IWithDepInj, IWithoutDepInj {}

const SocialPresenterUnconnect: React.FC<IProps> = (props: IProps) => {
  const [socials, setSocials] = useState<Array<SocialItem>>();

  useEffect(() => {
    loadSocialJson();
  }, []);

  const loadSocialJson = async () => {
    const socialJson = await props.dataJsonService.getSocial();
    if (socialJson.isSuccess) setSocials(socialJson.value);
  };

  let child = <SmallLoading />;
  if (socials != null) {
    child = (
      <div className="row justify">
        {socials.map((social: SocialItem, index: number) => {
          return (
            <div key={`${social.name}-${index}`} className="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6">
              <CardButton title={social.name} url={social.link} imageUrl={`/assets/images/${social.icon}`} />
            </div>
          );
        })}
      </div>
    );
  }

  const title = translate(LocaleKey.social);
  return (
    <DefaultAnimation>
      <HeadComponent title={title} />
      <NavBar title={title} />
      <div className="content">
        <div className="container full pt1">{child}</div>
      </div>
    </DefaultAnimation>
  );
};

export const SocialPresenter = withServices<IWithoutDepInj, IWithDepInj>(SocialPresenterUnconnect, (services: IDependencyInjection) => ({
  dataJsonService: services.dataJsonService,
}));
