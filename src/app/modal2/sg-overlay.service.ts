import { ComponentRef, Injectable, InjectionToken, Injector } from '@angular/core';
import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayManager } from './sg-overlay-manager-ref';

export const SG_OVERLAY_DATA = new InjectionToken<any>('SG_OVERLAY_DATA');

@Injectable()
export class OverlayService {

    constructor(
        private overlay: Overlay
    ) { }

    open<C, D>(componentType: ComponentType<C>, overlayConfig: OverlayConfig, data: D): OverlayManager {
        const overlayRef: OverlayRef = this.overlay.create(overlayConfig)
        const overlayManager: OverlayManager = new OverlayManager(overlayRef);

        const injector: Injector = Injector.create({
            providers: [
                { provide: OverlayManager, useValue: overlayManager },
                { provide: SG_OVERLAY_DATA, useValue: data },
            ]
        });
        const containerPortal: ComponentPortal<C> = new ComponentPortal(componentType, null, injector);
        const overlayComponentRef: ComponentRef<C> = overlayRef.attach(containerPortal);

        overlayManager.setComponentInstance(overlayComponentRef.instance);

        return overlayManager;
    }
}