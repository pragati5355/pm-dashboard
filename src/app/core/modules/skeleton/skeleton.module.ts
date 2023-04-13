import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableSkeletonComponent } from './table-skeleton/table-skeleton.component';
import { SkeletonWrapperComponent } from './skeleton-wrapper/skeleton-wrapper.component';

@NgModule({
    declarations: [TableSkeletonComponent, SkeletonWrapperComponent],
    imports: [CommonModule],
    exports: [TableSkeletonComponent,SkeletonWrapperComponent],
})
export class SkeletonModule {}
