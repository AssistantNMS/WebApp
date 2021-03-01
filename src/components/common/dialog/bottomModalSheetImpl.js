import React from 'react';
import Sheet from 'react-modal-sheet';

export const BottomModalSheetImpl = (props) => {
    return (
        <>
            <Sheet isOpen={props.isOpen}
                onClose={props.onClose}
                snapPoints={props.snapPoints}
                initialSnap={0}
            >
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>{props.children}</Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop onTap={props.onClose} />
            </Sheet>
        </>
    );
}
