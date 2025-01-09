import { NgModule } from '@angular/core';
import { FuseMediaWatcherService } from '../media-watcher/media-watcher.service';

@NgModule({
    providers: [
        FuseMediaWatcherService
    ]
})
export class FuseMediaWatcherModule
{
    /**
     * Constructor
     */
    constructor(private _fuseMediaWatcherService: FuseMediaWatcherService)
    {
    }
}
