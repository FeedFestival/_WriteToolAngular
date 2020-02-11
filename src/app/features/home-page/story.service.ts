import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpDefaultOptions } from 'src/app/app.constants';
import { LocalStorageService } from 'ngx-webstorage';
import { WriteToolUtils } from './story.utils';

type Options = {
    element: any;
    keys: string;
}

@Injectable({ providedIn: 'root' })
export class StoryService {

    isLoggedIn = false;
    userId = '';

    constructor(
        private http: HttpClient,
        private localStorage: LocalStorageService
    ) { }

    loggedIn(userId) {
        this.userId = userId;
        this.isLoggedIn = true;
    }

    getAll(): Observable<any[]> {
        if (this.isLoggedIn) {
            return this.http.get<any[]>(
                WriteToolUtils.baseRequestUrl() + 'StoryService/Get.php?a=' + WriteToolUtils.getAnotate(true) + '&userId=' + this.userId,
                HttpDefaultOptions
            );
        } else {
            return of(JSON.parse(this.localStorage.retrieve('stories')));
        }
    }

    getLast(): Observable<any> {
        if (this.isLoggedIn) {
            return this.http.get<any>(
                WriteToolUtils.baseRequestUrl() + 'StoryService/GetLast.php?a=' + WriteToolUtils.getAnotate(true) + '&userId=' + this.userId,
                HttpDefaultOptions);
        } else {
            const stories = JSON.parse(this.localStorage.retrieve('stories'));
            if (!stories || stories.length === 0) {
                return of(null);
            } else {
                let currentWorkingStoryId = this.localStorage.retrieve("currentWorkingStoryId");
                if (!currentWorkingStoryId || currentWorkingStoryId.length === 0) {
                    currentWorkingStoryId = (stories.length - 1)
                }
                return of(stories[stories.findIndex(s => s.guid === currentWorkingStoryId)]);
            }
        }
    }

    saveStory(story, isCurrentlyWorkingOnIt?: boolean): Observable<string> {

        if (this.isLoggedIn) {
            story.userId = this.userId;
            story.isLocal = false;
            return this.http.post<any>(
                WriteToolUtils.baseRequestUrl() + 'StoryService/Save.php?a=' + WriteToolUtils.getAnotate(true),
                story,
                HttpDefaultOptions
            );
        } else {
            let stories = JSON.parse(this.localStorage.retrieve('stories'));
            if (!stories) {
                stories = [];
            }
            if (!story.guid || story.guid.length === 0) {
                story.guid = WriteToolUtils.guid();
            }
            story.isLocal = true;
            stories.push(JSON.parse(JSON.stringify(story)));
            this.localStorage.store('stories', JSON.stringify(stories));

            if (isCurrentlyWorkingOnIt === true) {
                this.localStorage.store("currentWorkingStoryId", story.guid);
            }
            return of(null);
        }
    }

    storiesEqual(story, otherStory) {
        if (this.isLoggedIn) {
            return parseInt(story.id) === parseInt(otherStory.id);
        }
        return story.guid === otherStory.guid;
    }

    getStoryObject(value) {
        if (this.isLoggedIn) {
            return { id: value };
        }
        return {  id: '', guid: value };
    }

    comparer() {
        if (this.isLoggedIn) {
            return 'id';
        }
        return 'guid';
    }
}
