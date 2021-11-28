import { Injectable, Injector, ComponentRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { TestOverlayComponent } from '@shared/test-overlay/test-overlay.component';

import { FilePreviewOverlayRef } from './sg-overlay-ref';
import { FILE_PREVIEW_DIALOG_DATA } from './sg-overlay-tokens';

interface FilePreviewDialogConfig {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    options?: string[];
}

const DEFAULT_CONFIG: FilePreviewDialogConfig = {
    hasBackdrop: true,
    backdropClass: 'dark-backdrop',
    panelClass: 'tm-file-preview-dialog-panel',
    options: null
}

@Injectable()
export class FilePreviewOverlayService {

    constructor(
        private injector: Injector,
        private overlay: Overlay) { }

    open(config: FilePreviewDialogConfig = {}) {
        // Override default configuration
        const dialogConfig = { ...DEFAULT_CONFIG, ...config };

        // Returns an OverlayRef which is a PortalHost
        const overlayRef = this.createOverlay(dialogConfig);

        // Instantiate remote control
        const dialogRef = new FilePreviewOverlayRef(overlayRef);

        const overlayComponent = this.attachDialogContainer(overlayRef, dialogConfig, dialogRef);

        overlayRef.backdropClick().subscribe(_ => dialogRef.close());

        return dialogRef;
    }

    private createOverlay(config: FilePreviewDialogConfig) {
        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }

    private attachDialogContainer(overlayRef: OverlayRef, config: FilePreviewDialogConfig, dialogRef: FilePreviewOverlayRef) {
        const injector = this.createInjector(config, dialogRef);

        const containerPortal = new ComponentPortal(TestOverlayComponent, null, injector);
        const containerRef: ComponentRef<TestOverlayComponent> = overlayRef.attach(containerPortal);

        return containerRef.instance;
    }

    private createInjector(config: FilePreviewDialogConfig, dialogRef: FilePreviewOverlayRef): PortalInjector {
        const injectionTokens = new WeakMap();

        injectionTokens.set(FilePreviewOverlayRef, dialogRef);
        injectionTokens.set(FILE_PREVIEW_DIALOG_DATA, config.options);

        return new PortalInjector(this.injector, injectionTokens);
    }

    private getOverlayConfig(config: FilePreviewDialogConfig): OverlayConfig {
        const positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();

        const overlayConfig = new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });

        return overlayConfig;
    }
}