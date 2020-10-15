import {  Button, StyleSheet, View,Modal} from '../../'
import React from 'react';

export class AlertProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: '', describtion: '', buttons: [], visible: false };
    }
    onPressAny = (onPress = () => {}) => {
        this.setState({ visible: false, title: '', describtion: '', buttons: [] }, () => onPress());
    };
    alert(title, describtion, buttons) {
        this.setState({ visible: true, title, describtion, buttons });
    }
    render() {
        const { visible, title, describtion, buttons } = this.state;
        return (
            <>
                <Modal
                    visible={visible}
                    style={{
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)'
                        }
                    }}>
                    <div>
                        <div style={{ fontWeight: 'bold', marginBottom: 5 }}>{title}</div>
                        <div>{describtion}</div>
                        <View style={styles.buttonContainer}>
                            {buttons.length > 0 ? (
                                buttons.map((btn) => (
                                    <Button onPress={() => this.onPressAny(btn.onPress)} title={btn.text || ''} />
                                ))
                            ) : (
                                <Button onPress={() => this.onPressAny()} title={'Ok'} />
                            )}
                        </View>
                    </div>
                </Modal>
            </>
        );
    }
}

const staticAlert = React.createRef();
export function setStaticAlert() {
    return staticAlert;
}
function alert(title, describtion, buttons = []) {
    staticAlert.current?.alert(title, describtion, buttons);
}
const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
});
export default { alert };
