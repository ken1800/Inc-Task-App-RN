import Toast from 'react-native-toast-message';

export const shortToastMessage = (message: string) => {
    Toast.show({
        type: 'success',
        text1: message,
        position: 'top',
        visibilityTime: 2000,
    });
};
