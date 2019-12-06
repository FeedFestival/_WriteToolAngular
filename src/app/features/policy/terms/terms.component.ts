import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../home-page/seo.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-terms',
    templateUrl: './terms.component.html'
})
export class TermsComponent implements OnInit {

    constructor(
        private seoService: SeoService,
        private titleService: Title,
        private metaService: Meta,
    ) { }

    ngOnInit() {
        const page = 'terms';
        this.titleService.setTitle(this.seoService.getTitle(page));
        this.seoService.getAllTags().forEach(tag => {
            this.metaService.removeTag(tag);
        });
    }

}
