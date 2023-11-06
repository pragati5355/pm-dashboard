import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableSkeletonComponent } from './table-skeleton/table-skeleton.component';
import { SkeletonWrapperComponent } from './skeleton-wrapper/skeleton-wrapper.component';
import { CardSkeletonComponent } from './card-skeleton/card-skeleton.component';
import { FuseCardModule } from '@fuse/components/card';
import { ResourceEditSkeletonComponent } from './resource-edit-skeleton/resource-edit-skeleton.component';
@NgModule({
    declarations: [
        TableSkeletonComponent,
        SkeletonWrapperComponent,
        CardSkeletonComponent,
        ResourceEditSkeletonComponent,
    ],
    imports: [CommonModule, FuseCardModule],
    exports: [
        TableSkeletonComponent,
        SkeletonWrapperComponent,
        CardSkeletonComponent,
        ResourceEditSkeletonComponent,
    ],
})
export class SkeletonModule {}
