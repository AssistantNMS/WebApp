import React from 'react';
import { Link } from 'react-router-dom';

import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { PatreonBlock } from '../../components/common/patreon/patreonBlock';
import { ImageContainer } from '../../components/common/tile/imageContainer';
import { TextContainer } from '../../components/common/tile/textContainer';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { fishingBait, fishingLocation } from '../../constants/Route';
import { LocaleKey } from '../../localization/LocaleKey';
import { translate } from '../../localization/Translate';
import { patreonUnlockDate } from '../../constants/Patreon';
import { AppImage } from '../../constants/AppImage';

export const FishingPage: React.FC = () => {
	const title = translate(LocaleKey.fishing);
	return (
		<DefaultAnimation>
			<HeadComponent title={title} />
			<NavBar title={title} />
			<div className="content" data-id="FishingPage">
				<PatreonBlock dateAvailable={patreonUnlockDate.fishing}>
					<div className="fishing row justify full pt5 pb5">
						<div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
							<Link to={fishingBait} className="update item card" draggable={false}>
								<ImageContainer Icon={AppImage.fishingBait} Name="Bait" Colour="095C77" Height="256px" />
								<TextContainer text={translate(LocaleKey.fishingBait)} additionalCss="title" />
							</Link>
						</div>
						<div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
							<Link to={fishingLocation} className="update item card" draggable={false}>
								<ImageContainer Icon={AppImage.fishingLocation} Name="Bait" Colour="F3A923" Height="256px" />
								<TextContainer text={translate(LocaleKey.fishingLocation)} additionalCss="title" />
							</Link>
						</div>
					</div>
				</PatreonBlock>
			</div>
		</DefaultAnimation>
	);
};
