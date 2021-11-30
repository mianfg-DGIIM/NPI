import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private destinationPoi : number = 0;
  private canScan : boolean = false;
  private helpShown : boolean = false;

  public getDestinationPoi(): number {
    return this.destinationPoi;
  }

  public setDestinationPoi(poi: number): void {
    this.destinationPoi = poi;
  }

  public getCanScan(): boolean {
    return this.canScan;
  }

  public setCanScan(can: boolean): void {
    this.canScan = can;
  }

  public getHelpShown(): boolean {
    return this.helpShown;
  }

  public setHelpShown(shown: boolean): void {
    this.helpShown = shown;
  }
}
