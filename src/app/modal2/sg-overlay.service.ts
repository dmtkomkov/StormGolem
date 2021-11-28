import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TestOverlayComponent } from '@shared/test-overlay/test-overlay.component';

import { FilePreviewOverlayRef } from './sg-overlay-ref';
import { FILE_PREVIEW_DIALOG_DATA } from './sg-overlay-tokens';

interface FilePreviewDialogConfig {
    hasBackdrop?: boolean;
    options?: string[];
}

const DEFAULT_CONFIG: FilePreviewDialogConfig = {
    hasBackdrop: true,
    options: null
}

@Injectable()
export class FilePreviewOverlayService {

    constructor(
        private overlay: Overlay
    ) { }

    open(config: FilePreviewDialogConfig = {}) {
        // Override default configuration
        const dialogConfig = { ...DEFAULT_CONFIG, ...config };

        // Returns an OverlayRef which is a PortalHost
        const overlayRef = this.createOverlay(dialogConfig);

        // Instantiate remote control
        const dialogRef = new FilePreviewOverlayRef(overlayRef);

        const injector = this.createInjector(config, dialogRef);
        const containerPortal = new ComponentPortal(TestOverlayComponent, null, injector);
        overlayRef.attach(containerPortal);

        overlayRef.backdropClick().subscribe(_ => dialogRef.close());

        return dialogRef;
    }

    private createOverlay(config: FilePreviewDialogConfig) {
        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }

    private createInjector(config: FilePreviewDialogConfig, dialogRef: FilePreviewOverlayRef): Injector {
        const injector: Injector = Injector.create({
            providers: [
                {
                    provide: FilePreviewOverlayRef,
                    useValue: dialogRef
                },
                {
                    provide: FILE_PREVIEW_DIALOG_DATA,
                    useValue: config.options
                },
            ]
        });

        return injector;
    }

    private getOverlayConfig(config: FilePreviewDialogConfig): OverlayConfig {
        const positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();

        const overlayConfig = new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });

        return overlayConfig;
    }
}