import { OverlayRef } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';

export class OverlayManagerRef {
    // Instance of Component Portal
    private _componentInstance: Component = null;
    private _afterClosed: Subject<any> = new Subject<any>();

    constructor(
        private overlayRef: OverlayRef
    ) { }

    setComponentInstance(component: Component) {
        this._componentInstance = component;
    }

    getComponentInstance() {
        return this._componentInstance
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