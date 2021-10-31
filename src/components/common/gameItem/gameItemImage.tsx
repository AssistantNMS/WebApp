
import * as React from 'react';
import { GameItemService } from '../../../services/GameItemService';
import { ImageContainer } from '../tile/imageContainer';




interface IProps {
    id: string;
}

interface IState {
    icon: string;
    gameItemService: GameItemService;
}

export class GameItemImage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            icon: 'loader.svg',
            gameItemService: new GameItemService()
        }

        this.fetchData(this.props.id);
    }

    fetchData = async (itemId: string) => {
        const itemDetails = await this.state.gameItemService.getItemDetails(itemId);

        this.setState(() => {
            return {
                icon: itemDetails.value.Icon,
            }
        });
    }

    render() {
        return (
            <ImageContainer Name={this.state.icon} Icon={this.state.icon} />
        );
    }
}