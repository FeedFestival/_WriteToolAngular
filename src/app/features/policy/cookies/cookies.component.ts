import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../home-page/seo.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-cookies',
    templateUrl: './cookies.component.html'
})
export class CookiesComponent implements OnInit {

    constructor(
        private seoService: SeoService,
        private titleService: Title,
        private metaService: Meta,
    ) { }

    ngOnInit() {
        const page = 'cookies';
        this.titleService.setTitle(this.seoService.getTitle(page));
        this.seoService.getAllTags().forEach(tag => {
            this.metaService.removeTag(tag);
        });
    }

}
