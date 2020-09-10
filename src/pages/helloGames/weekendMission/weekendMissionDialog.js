import React from 'react';
import Sheet from 'react-modal-sheet';

export const WeekendMissionDialog = (props) => {
    return (
        <>
            <Sheet isOpen={props.isOpen}
                onClose={props.close}
                snapPoints={[600]}
                initialSnap={0}
            >
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>{props.children}</Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop onTap={props.close} />
            </Sheet>
        </>
    );
}
