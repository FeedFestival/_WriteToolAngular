import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { SeoService } from '../home-page/seo.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    constructor(
        private seoService: SeoService,
        private titleService: Title,
        private metaService: Meta,
    ) { }

    ngOnInit() {
        const page = 'about';

        this.titleService.setTitle(this.seoService.getTitle(page));
        this.seoService.getAllTags().forEach(tag => {
            this.metaService.removeTag(tag);
        });
        this.metaService.addTags(this.seoService.getMetaTags(page));
    }

}
