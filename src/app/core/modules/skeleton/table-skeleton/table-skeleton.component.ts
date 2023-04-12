import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';

interface skeletonDataType {
    rowsToDisplay: number;
    displayProfilePicture: boolean;
}

@Component({
    selector: 'app-table-skeleton',
    templateUrl: './table-skeleton.component.html',
    styleUrls: ['./table-skeleton.component.scss'],
})
export class TableSkeletonComponent implements OnInit, OnChanges {
    @Input() skeletonData: skeletonDataType;

    noOfSkeletonRows: number[];

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['skeletonData']) {
            this.noOfSkeletonRows = Array(this.skeletonData.rowsToDisplay).fill(
                0
            );
        }
    }
}
