import { ApplicationRef, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Injectable()
export class DialogService {
    private dialogComponentRef: ComponentRef<ConfirmationDialogComponent> | null = null;

    constructor(
        private appRef: ApplicationRef
    ) { }

    openConfirmationDialog(viewContainerRef: ViewContainerRef, message: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            const componentRef = viewContainerRef.createComponent(ConfirmationDialogComponent);
            const componentInstance: ConfirmationDialogComponent = componentRef.instance;

            componentInstance.message = message;
            componentInstance.confirmed.subscribe((result: boolean) => {
                resolve(result);
                this.closeConfirmationDialog();
            });

            this.dialogComponentRef = componentRef;
        });
    }

    private closeConfirmationDialog(): void {
        if (this.dialogComponentRef) {
            this.appRef.detachView(this.dialogComponentRef.hostView);
            this.dialogComponentRef.destroy();
            this.dialogComponentRef = null;
        }
    }
}
