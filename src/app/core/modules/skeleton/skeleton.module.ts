import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableSkeletonComponent } from './table-skeleton/table-skeleton.component';
import { SkeletonWrapperComponent } from './skeleton-wrapper/skeleton-wrapper.component';
import { CardSkeletonComponent } from './card-skeleton/card-skeleton.component';
import { FuseCardModule } from '@fuse/components/card';
@NgModule({
    declarations: [
        TableSkeletonComponent,
        SkeletonWrapperComponent,
        CardSkeletonComponent,
    ],
    imports: [CommonModule, FuseCardModule],
    exports: [
        TableSkeletonComponent,
        SkeletonWrapperComponent,
        CardSkeletonComponent,
    ],
})
export class SkeletonModule {}
