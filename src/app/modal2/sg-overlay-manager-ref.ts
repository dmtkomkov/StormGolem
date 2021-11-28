import { OverlayRef } from '@angular/cdk/overlay';
import { Component } from '@angular/core';

export class OverlayManagerRef {
    // Instance of Component Portal
    private componentInstance: Component = null;

    setComponentInstance(component: Component) {
        this.componentInstance = component;
    }

    constructor(
        private overlayRef: OverlayRef
    ) { }

    close(): void {
        console.log(this.componentInstance);
        this.overlayRef.dispose();
        this.componentInstance = null;
    }
}