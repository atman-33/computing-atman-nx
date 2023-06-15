import { HttpErrorResponse } from '@angular/common/http';

export function handleErrorMessage(err: HttpErrorResponse): string[] {
    if (typeof err.error.message === 'string') {
        return [err.error.message];
    } else if (Array.isArray(err.error.message)) {
        return err.error.message;
    } else {
        return ['An unexpected error occurred.'];
    }
}
