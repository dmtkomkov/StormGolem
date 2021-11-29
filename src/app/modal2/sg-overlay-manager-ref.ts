import { OverlayRef } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';

export class OverlayManager {
    // Instance of Component Portal
    private _componentInstance: Component = null;
    private _afterClosed: Subject<any> = new Subject<any>();

    constructor(
        private overlayRef: OverlayRef
    ) {
        overlayRef.backdropClick().subscribe(_ => this.close());
        overlayRef.outsidePointerEvents().subscribe(_ => this.close());
    }

    setComponentInstance(component: Component) {
        this._componentInstance = component;
    }

    close(data: any = null) {
        this.overlayRef.dispose();
        this._componentInstance = null;
        this._afterClosed.next(data);
        this._afterClosed.complete();
    }

    afterClosed() {
        return this._afterClosed;
    }
}