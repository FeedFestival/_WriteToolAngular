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
            return this.http.get<any[]>(WriteToolUtils.baseRequestUrl() + 'StoryService/Get.php?userId=' + this.userId);
        } else {
            return of(JSON.parse(this.localStorage.retrieve('stories')));
        }
    }

    getLast(): Observable<any> {
        if (this.isLoggedIn) {
            return this.http.get<any>(WriteToolUtils.baseRequestUrl() + 'StoryService/GetLast.php?userId=' + this.userId);
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
            return this.http.post<any>(WriteToolUtils.baseRequestUrl() + 'StoryService/Save.php', story, HttpDefaultOptions);
        } else {
            let stories = JSON.parse(this.localStorage.retrieve('stories'));
            if (!story.guid || story.guid.length === 0) {
                story.guid = this.guid();
            }
            stories.push(JSON.parse(JSON.stringify(story)));
            this.localStorage.store('stories', JSON.stringify(stories));

            if (isCurrentlyWorkingOnIt === true) {
                this.localStorage.store("currentWorkingStoryId", story.guid);
            }
            return of(null);
        }
    }

    saveStoryElements(elements, storyId): Observable<any> {

        const elementsWithNoImages = JSON.parse(JSON.stringify(elements));
        elementsWithNoImages.forEach(e => e.image = null);

        const requestOptions: Object = {
            ...HttpDefaultOptions,
            responseType: 'text'
        }
        return this.http.post<any>(
            WriteToolUtils.baseRequestUrl() + 'UserService/Register.php',
            { elements: elements, storyId: storyId },
            requestOptions
        );
    }

    storiesEqual(story, otherStory) {
        if (this.isLoggedIn) {
            return story.id === otherStory.id;
        }
        return story.guid === otherStory.guid;
    }

    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
