import { useState, SetStateAction, Dispatch } from 'react';
import { Snackbar } from 'react-native-paper';

interface ErrorBarProps {
    errorText: string,
    setErrorText: Dispatch<SetStateAction<string>>
}

export default function ErrorBar({errorText, setErrorText}: ErrorBarProps) {
  const onDismissSnackBar = () => setErrorText("");

    return (
        <Snackbar
            visible={Boolean(errorText)}
            onDismiss={onDismissSnackBar}
            duration={2000}
            style={{flex: 1}}>
        {errorText}
      </Snackbar>
    )
}