import { ComponentRef, Injectable, InjectionToken, Injector } from '@angular/core';
import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayManagerRef } from './sg-overlay-manager-ref';

export const SG_OVERLAY_DATA = new InjectionToken<string[]>('SG_OVERLAY_DATA');

@Injectable()
export class OverlayService {

    constructor(
        private overlay: Overlay
    ) { }

    open<C, D>(componentType: ComponentType<C>, overlayConfig: OverlayConfig, data: D): OverlayManagerRef {
        const overlayRef: OverlayRef = this.overlay.create(overlayConfig)
        const overlayManagerRef: OverlayManagerRef = new OverlayManagerRef(overlayRef);

        // Add injections overlayManagerRef and data into Portal component
        const injector: Injector = Injector.create({
            providers: [
                { provide: OverlayManagerRef, useValue: overlayManagerRef },
                { provide: SG_OVERLAY_DATA, useValue: data },
            ]
        });
        const containerPortal = new ComponentPortal(componentType, null, injector);
        const overlayComponentRef: ComponentRef<C> = overlayRef.attach(containerPortal);
        overlayManagerRef.setComponentInstance(overlayComponentRef.instance);

        overlayRef.backdropClick().subscribe(_ => overlayManagerRef.close());
        overlayRef.outsidePointerEvents().subscribe(_ => overlayManagerRef.close());

        return overlayManagerRef;
    }
}