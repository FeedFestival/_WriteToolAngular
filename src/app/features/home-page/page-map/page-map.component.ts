import { Component, OnInit } from '@angular/core';
import { ElementType } from 'src/app/app.constants';
import { ElementsService } from '../element/elements.service';

@Component({
    selector: 'app-page-map',
    templateUrl: './page-map.component.html'
})
export class PageMapComponent implements OnInit {

    ElementType = ElementType;
    bookmarks: IBookmark[];

    constructor(
        private elementsService: ElementsService
    ) {
        elementsService.getUpdateMap()
            .subscribe(this.refresh);
    }

    ngOnInit() {
        this.bookmarks = [
            // {
            //     id: '1',
            //     type: ElementType.SCENE_HEADING,
            //     text: 'INT. SCENE HEADING'
            // },
            // {
            //     id: '1',
            //     type: ElementType.ACTION,
            //     text: 'ACTION',
            //     isSecondary: true
            // },
            // {
            //     id: '1',
            //     type: ElementType.COMMENT,
            //     text: 'COMMENT'
            // },
            // {
            //     id: '1',
            //     type: ElementType.CHARACTER,
            //     text: 'CHARACTER',
            //     isSecondary: true
            // },
            // {
            //     id: '1',
            //     type: ElementType.DIALOG,
            //     text: 'DIALOG',
            //     isSecondary: true
            // },
            // {
            //     id: '1',
            //     type: ElementType.PICTURE,
            //     text: 'PICTURE',
            //     isSecondary: true
            // },
            // {
            //     id: '1',
            //     type: ElementType.VIDEO,
            //     text: 'VIDEO',
            //     isSecondary: true
            // },
            // {
            //     id: '1',
            //     type: ElementType.SOUND,
            //     text: 'SOUND',
            //     isSecondary: true
            // }
        ];
    }

    refresh = (bookmarks) => {
        this.bookmarks = bookmarks;
    }

    goToBookmark(bookmarkId) {
        this.elementsService.emitGoToBookmark(bookmarkId);
    }
}

export interface IBookmark {
    id?: string;
    type?: string;
    text?: string;
    isSecondary?: boolean;
}
